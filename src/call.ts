import { ConnectionError, SolidgateError, TimeoutError, errorFromResponse, isResponseLike } from './errors';
import { isListMethod, paginate } from './pagination';

export interface RequestOptions {
  timeout?: number;
  maxRetries?: number;
  signal?: AbortSignal;
}

// Methods whose operation declares the Idempotency-Key header (createInvoice, payInvoice, …).
export interface IdempotentRequestOptions extends RequestOptions {
  idempotencyKey?: string;
}

const OPTION_NAMES: readonly string[] = ['timeout', 'maxRetries', 'signal'];
const IDEMPOTENT_OPTION_NAMES: readonly string[] = [...OPTION_NAMES, 'idempotencyKey'];

function assertOptions(method: string, options: unknown, allowed: readonly string[]): void {
  if (options === undefined) return;
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError(`Solidgate: ${method}'s options must be an object.`);
  }
  for (const key of Object.keys(options)) {
    if (!allowed.includes(key)) {
      throw new TypeError(`Solidgate: ${method} does not take the option "${key}" (it takes: ${allowed.join(', ')}).`);
    }
  }
}

export interface ResponseDetails {
  readonly requestId: string | undefined;
  readonly statusCode: number;
  readonly headers: Headers;
  readonly idempotency: IdempotencyDetails | undefined;
}

export interface IdempotencyDetails {
  readonly key: string;
  readonly status: IdempotencyStatus | undefined;
  readonly replayed: boolean;
  readonly createdAt: Date | undefined;
  readonly expiresAt: Date | undefined;
}

export type IdempotencyStatus = 'stored' | 'replayed' | 'not-stored' | 'ignored' | (string & {});

// Methods with no response body (payInvoice, deleteInvoice, …) resolve to an object holding only
// responseDetails: their requestId and idempotency matter most on exactly those writes.
export type WithResponseDetails<T> = [T] extends [void]
  ? { readonly responseDetails: ResponseDetails }
  : T extends object
    ? T & { readonly responseDetails: ResponseDetails }
    : T;

// read: get/list/search/download without an Idempotency-Key; keyed-write: the call has a key.
export type RequestKind = 'read' | 'keyed-write' | 'write';

export interface CallContext {
  kind?: RequestKind;
  idempotencyKey?: string;
  timeout?: number;
  maxRetries?: number;
  response?: ResponseDetails;
  // Set by the transport with the response: the attempt's timer, still armed while the body is read.
  expire?: (error: TimeoutError) => void;
  clearAttempt?: () => void;
}

// The generated runtime copies initOverrides into the RequestInit it hands to fetchApi, so the
// context reaches the transport (src/transport.ts) under this key.
export const CALL_CONTEXT = Symbol('solidgate.call');

export function callContext(init: RequestInit | undefined): CallContext | undefined {
  return (init as Record<symbol, CallContext | undefined> | undefined)?.[CALL_CONTEXT];
}

function dateHeader(headers: Headers, name: string): Date | undefined {
  const value = headers.get(name);
  const date = value ? new Date(value) : undefined;
  return date && !Number.isNaN(date.getTime()) ? date : undefined;
}

export function responseDetails(response: Response, idempotencyKey: string | undefined): ResponseDetails {
  // `not-stored; reason=unavailable`: the status is the part before the parameters.
  const status = response.headers.get('Idempotency-Status')?.split(';')[0].trim() || undefined;
  return Object.freeze({
    requestId: response.headers.get('Request-Id') ?? undefined,
    statusCode: response.status,
    headers: response.headers,
    idempotency:
      idempotencyKey === undefined
        ? undefined
        : Object.freeze({
            key: idempotencyKey,
            status,
            replayed: status === 'replayed',
            createdAt: dateHeader(response.headers, 'Idempotency-Created-At'),
            expiresAt: dateHeader(response.headers, 'Idempotency-Expires-At'),
          }),
  });
}

type GeneratedMethod = (...args: unknown[]) => Promise<unknown>;

export type MethodParams = { readonly [method: string]: readonly string[] };

export const IDEMPOTENCY_KEY = 'header:Idempotency-Key' as const;

// The PARAMS entries the call layer fills; any other is not sent (undefined), and the SDK's
// test:codegen check fails this repo's pipeline until the SDK supports it.
export const PLACEABLE_PARAMS: readonly string[] = ['body', IDEMPOTENCY_KEY];

// The operations whose answer is a redirect (the spec declares a 3xx): the Location is the result.
// A redirect on any other method is an error (a proxy, an http->https or a moved path), so it never
// resolves to something typed as that method's model. test:codegen checks this list against the spec.
export const REDIRECT_RESULTS = ['downloadReport'] as const;
export type RedirectMethod = (typeof REDIRECT_RESULTS)[number];

export interface RedirectResult {
  readonly url: string;
  readonly responseDetails: ResponseDetails;
}

// The generated runtime throws ResponseError for anything but 2xx, a 3xx redirect included.
function redirectLocation(error: unknown): string | undefined {
  const { name, response } = (error ?? {}) as {
    name?: unknown;
    response?: { status?: number; headers?: { get?(name: string): string | null } };
  };
  const status = response?.status ?? 0;
  if (name !== 'ResponseError' || status < 300 || status >= 400) return undefined;
  return response?.headers?.get?.('Location') ?? undefined;
}

async function toSolidgateError(error: unknown, context: CallContext): Promise<unknown> {
  if (error instanceof SolidgateError) return error;
  const { name, response, cause } = (error ?? {}) as { name?: unknown; response?: unknown; cause?: unknown };
  if (name === 'ResponseError' && isResponseLike(response)) {
    return errorFromResponse(response, { idempotencyKey: context.idempotencyKey });
  }
  if (name === 'FetchError') {
    if (cause instanceof SolidgateError) return cause;
    const reason = cause instanceof Error ? cause.message : String(cause);
    return new ConnectionError(`Solidgate: no response from the API: ${reason}`, {
      cause,
      idempotencyKey: context.idempotencyKey,
    });
  }
  return error;
}

// Every v2 operation is a short request; the slow work (reports) is asynchronous.
export const MAX_TIMEOUT = 600_000;

// As the API documents it: 1 to 255 printable ASCII characters. Checked before sending: a newline
// would make fetch reject the header, which would look like a lost connection.
function assertIdempotencyKey(method: string, key: unknown): void {
  if (key !== undefined && (typeof key !== 'string' || !/^[\x20-\x7e]{1,255}$/.test(key))) {
    throw new TypeError(`Solidgate: ${method}'s idempotencyKey must be 1 to 255 printable ASCII characters.`);
  }
}

export function assertCount(name: string, value: unknown): void {
  if (value !== undefined && (typeof value !== 'number' || !Number.isInteger(value) || value < 0)) {
    throw new TypeError(`Solidgate: ${name} must be a whole number, 0 or more.`);
  }
}

const READ_METHOD = /^(get|list|search|download)[A-Z]/;

export function assertTimeout(timeout: unknown): void {
  if (timeout === undefined) return;
  if (typeof timeout !== 'number' || !Number.isFinite(timeout) || timeout <= 0 || timeout > MAX_TIMEOUT) {
    throw new TypeError(
      `Solidgate: timeout must be a number of milliseconds above 0 and at most ${MAX_TIMEOUT} (10 minutes).`,
    );
  }
}

// Set on a copy; a request model without a channel_id field drops it when serialized (its ToJSON
// writes only its own fields), so only requests that have the field get it.
function withChannel(params: unknown, channelId: string | undefined): unknown {
  if (channelId === undefined || params === null || typeof params !== 'object' || Array.isArray(params)) return params;
  if ((params as { channel_id?: unknown }).channel_id != null) return params;
  return { ...params, channel_id: channelId };
}

export function wrapResource<T extends object>(
  resource: T,
  methodParams: MethodParams,
  defaults: { channelId?: string } = {},
): T {
  return new Proxy(resource, {
    get(target, name, receiver) {
      const method = Reflect.get(target, name, receiver) as GeneratedMethod;
      // API methods are the ones in PARAMS (from the spec template); everything else passes through.
      const names =
        typeof name === 'string' && Object.prototype.hasOwnProperty.call(methodParams, name)
          ? methodParams[name]
          : undefined;
      if (names === undefined || typeof method !== 'function') return method;
      const call = async (params: unknown, options: IdempotentRequestOptions = {}) => {
        const takesKey = names.includes(IDEMPOTENCY_KEY);
        assertOptions(String(name), options, takesKey ? IDEMPOTENT_OPTION_NAMES : OPTION_NAMES);
        assertIdempotencyKey(String(name), options.idempotencyKey);
        assertTimeout(options.timeout);
        assertCount('maxRetries', options.maxRetries);
        // The body read and error mapping race the attempt's timer, which the transport hands over
        // with the response: the timeout covers the whole response, not only its headers.
        let timedOut: TimeoutError | undefined;
        let expire: (error: TimeoutError) => void = () => {};
        const expired = new Promise<never>((_, reject) => (expire = reject));
        expired.catch(() => {});
        const settle = <V>(work: Promise<V>): Promise<V> => Promise.race([work, expired]);
        const context: CallContext = {
          timeout: options.timeout,
          maxRetries: options.maxRetries,
          expire: (error) => {
            timedOut = error;
            expire(error);
          },
        };
        // A key is generated where the spec declares the header, and reused on every retry.
        if (takesKey) context.idempotencyKey = options.idempotencyKey ?? globalThis.crypto.randomUUID();
        context.kind =
          context.idempotencyKey !== undefined
            ? 'keyed-write'
            : !takesKey && READ_METHOD.test(String(name))
              ? 'read'
              : 'write';
        // Redirects are not followed: downloadReport's 303 points at a short-lived file URL, which the
        // merchant fetches (or streams) when they choose; the API key never follows a redirect.
        const init = { signal: options.signal, redirect: 'manual' as const, [CALL_CONTEXT]: context };
        const body = withChannel(params, defaults.channelId);
        const args = names.map((n) =>
          n === 'body' ? body : n === IDEMPOTENCY_KEY ? context.idempotencyKey : undefined,
        );
        try {
          const result = await settle(method.apply(target, [...args, init]));
          if (result === undefined) {
            return Object.freeze(Object.defineProperty({}, 'responseDetails', { value: context.response }));
          }
          if (result !== null && typeof result === 'object') {
            Object.defineProperty(result, 'responseDetails', { value: context.response, enumerable: false });
          }
          return result;
        } catch (error) {
          if (options.signal?.aborted) throw options.signal.reason;
          if (timedOut) throw timedOut;
          const url = (REDIRECT_RESULTS as readonly string[]).includes(String(name))
            ? redirectLocation(error)
            : undefined;
          if (url !== undefined && context.response) {
            return Object.freeze(
              Object.defineProperties(
                {},
                { url: { value: url, enumerable: true }, responseDetails: { value: context.response } },
              ),
            );
          }
          // Reading the error body can take a while: an abort that lands meanwhile cuts the read,
          // and the caller's reason wins over the error built from what was read.
          const mapped = await settle(toSolidgateError(error, context)).catch((e: unknown) => e);
          if (options.signal?.aborted) throw options.signal.reason;
          throw mapped;
        } finally {
          context.clearAttempt?.();
        }
      };
      return isListMethod(String(name))
        ? (params: unknown, options?: IdempotentRequestOptions) => paginate(call, params, options)
        : call;
    },
  });
}
