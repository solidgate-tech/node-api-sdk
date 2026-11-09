import { callContext, responseDetails, type CallContext, type RequestKind } from './call';
import { RateLimitError, TimeoutError, errorFromResponse, retryAfter } from './errors';

export interface TransportOptions {
  fetch?: typeof fetch;
  timeout: number;
  maxRetries: number;
}

// Backoff between retries when the API gives no wait: the first retry waits 250-500 ms, doubling
// up to 4-8 s (as the OpenAI and Anthropic SDKs). Not options: merchants set maxRetries and timeout.
export const INITIAL_RETRY_DELAY = 500;
export const MAX_RETRY_DELAY = 8_000;

// The longest wait a 429 or 409 may ask for before a retry; beyond it the error is thrown.
export const MAX_RATE_LIMIT_WAIT = 60_000;

// Failures before the request left: retrying cannot apply a write twice.
const NOT_SENT = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'EAI_AGAIN',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'UND_ERR_CONNECT_TIMEOUT',
]);

function notSent(error: unknown): boolean {
  for (let e = error, depth = 0; e && depth < 4; e = (e as { cause?: unknown }).cause, depth++) {
    const code = (e as { code?: unknown }).code;
    if (typeof code === 'string' && NOT_SENT.has(code)) return true;
  }
  return false;
}

// A failed attempt with no response: reads and keyed writes may be sent again (the API applies a
// keyed write once); a write without a key only when it never left.
function retryableFailure(kind: RequestKind, error: unknown): boolean {
  return kind !== 'write' || notSent(error);
}

export function backoff(retry: number, initial: number, max: number): number {
  const ceiling = Math.min(max, initial * 2 ** retry);
  return ceiling / 2 + Math.random() * (ceiling / 2);
}

function msUntil(at: Date | undefined): number | undefined {
  return at === undefined ? undefined : Math.max(0, at.getTime() - Date.now());
}

function sleep(ms: number, signal: AbortSignal | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

// A retried response's body is never read: cancel it so the connection is freed.
function discard(response: Response): void {
  response.body?.cancel().catch(() => {});
}

// One timer per attempt: each retry gets the full timeout (as in stripe-node). A plain setTimeout,
// not AbortSignal.timeout(): that timer does not keep the event loop alive. When it fires it aborts
// the request and rejects `expired`, so a fetch that ignores the signal cannot outlive it either.
function attemptTimer(timeout: number, callerSignal: AbortSignal | undefined, makeError: () => TimeoutError) {
  const controller = new AbortController();
  let error: TimeoutError | undefined;
  let reject: (reason: TimeoutError) => void = () => {};
  const expired = new Promise<never>((_, r) => (reject = r));
  expired.catch(() => {});
  const handle = setTimeout(() => {
    error = makeError();
    controller.abort(error);
    reject(error);
  }, timeout);
  return {
    signal: callerSignal ? AbortSignal.any([controller.signal, callerSignal]) : controller.signal,
    expired,
    error: () => error,
    clear: () => clearTimeout(handle),
  };
}

// Built when the timer fires: after headers, the error says what arrived.
function timeoutError(timeout: number, context: CallContext | undefined): TimeoutError {
  const received = context?.response;
  return new TimeoutError(
    received
      ? `Solidgate: no complete response within ${timeout} ms (HTTP ${received.statusCode} received)`
      : `Solidgate: no response within ${timeout} ms`,
    { status: received?.statusCode, requestId: received?.requestId, idempotencyKey: context?.idempotencyKey },
  );
}

export function createTransport(options: TransportOptions): typeof fetch {
  const send = options.fetch ?? ((input, init) => globalThis.fetch(input, init));
  return async (input, init) => {
    const context = callContext(init);
    const kind = context?.kind ?? 'write';
    const timeout = context?.timeout ?? options.timeout;
    const maxRetries = context?.maxRetries ?? options.maxRetries;
    const callerSignal = init?.signal ?? undefined;
    const delay = (retry: number) => backoff(retry, INITIAL_RETRY_DELAY, MAX_RETRY_DELAY);

    for (let retry = 0; ; retry++) {
      const canRetry = retry < maxRetries;
      // Each attempt has its own timer (the full timeout) and its own response details.
      if (context) context.response = undefined;
      const attempt = attemptTimer(timeout, callerSignal, () => timeoutError(timeout, context));
      const withinAttempt = <V>(work: Promise<V>): Promise<V> => Promise.race([work, attempt.expired]);
      let response: Response;
      try {
        response = await withinAttempt(send(input, { ...init, signal: attempt.signal }));
      } catch (error) {
        attempt.clear();
        if (callerSignal?.aborted) throw error;
        if (canRetry && retryableFailure(kind, error)) {
          await sleep(delay(retry), callerSignal);
          continue;
        }
        throw attempt.error() ?? error;
      }

      if (response.status === 429 && canRetry) {
        // The same parsing as the RateLimitError a merchant would get: context.next_try_at, else Retry-After.
        const error = await withinAttempt(errorFromResponse(response.clone())).catch(() => undefined);
        const asked = msUntil(error instanceof RateLimitError ? error.nextTryAt : undefined);
        if (asked === undefined || asked <= MAX_RATE_LIMIT_WAIT) {
          attempt.clear();
          discard(response);
          // Jitter on top: clients told the same moment do not all come back at once.
          await sleep(asked === undefined ? delay(retry) : asked + Math.random() * 250, callerSignal);
          continue;
        }
      }

      // The key's first request is still running: once it finishes, the same key gets its result.
      if (response.status === 409 && kind === 'keyed-write' && canRetry) {
        const error = await withinAttempt(errorFromResponse(response.clone())).catch(() => undefined);
        const asked = msUntil(retryAfter(response.headers));
        if (error?.code === 'IDEMPOTENCY_KEY_IN_USE' && (asked === undefined || asked <= MAX_RATE_LIMIT_WAIT)) {
          attempt.clear();
          discard(response);
          await sleep(asked ?? delay(retry), callerSignal);
          continue;
        }
      }

      // A write is not retried on 5xx: it may have been applied.
      if (response.status >= 500 && kind === 'read' && canRetry) {
        attempt.clear();
        discard(response);
        await sleep(delay(retry), callerSignal);
        continue;
      }

      if (!context) {
        attempt.clear();
        return response;
      }
      context.response = responseDetails(response, context.idempotencyKey);
      // The body is read after this returns (json(), or text() for an error): the timer stays armed
      // until the call settles, and src/call.ts clears it.
      attempt.expired.catch((error: TimeoutError) => context.expire?.(error));
      context.clearAttempt = attempt.clear;
      return response;
    }
  };
}
