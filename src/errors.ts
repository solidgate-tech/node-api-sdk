export interface FieldError {
  readonly type: string;
  readonly message: string;
}

export interface ErrorDetails {
  status?: number;
  code?: string;
  context?: Record<string, unknown>;
  requestId?: string;
  idempotencyKey?: string;
  cause?: unknown;
}

export class SolidgateError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;
  readonly context: Record<string, unknown> | undefined;
  readonly requestId: string | undefined;
  // The call's Idempotency-Key, if it had one: repeat the call with it, and the API applies the
  // write once (a 5xx or a lost connection may or may not have applied it).
  readonly idempotencyKey: string | undefined;

  constructor(message: string, details: ErrorDetails = {}) {
    super(message);
    this.name = new.target.name;
    if (details.cause !== undefined) {
      Object.defineProperty(this, 'cause', { value: details.cause, writable: true, configurable: true });
    }
    this.status = details.status;
    this.code = details.code;
    this.context = details.context;
    this.requestId = details.requestId;
    this.idempotencyKey = details.idempotencyKey;
  }
}

export class APIError extends SolidgateError {}

export class ValidationError extends APIError {
  readonly fieldErrors: Readonly<Record<string, FieldError>>;

  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    const constraints = details.context?.constraints;
    this.fieldErrors = Object.freeze(
      constraints !== null && typeof constraints === 'object' ? (constraints as Record<string, FieldError>) : {},
    );
  }
}

export class AuthenticationError extends APIError {}

export class PermissionDeniedError extends APIError {}

export class NotFoundError extends APIError {}

export class ConflictError extends APIError {}

export class StateError extends APIError {}

export class IdempotencyKeyReusedError extends StateError {}

export class RateLimitError extends APIError {
  readonly nextTryAt: Date | undefined;

  constructor(message: string, details: ErrorDetails & { nextTryAt?: Date } = {}) {
    super(message, details);
    this.nextTryAt = details.nextTryAt;
  }
}

export class InternalServerError extends APIError {}

export class ConnectionError extends SolidgateError {}

export class TimeoutError extends ConnectionError {}

// A webhook delivery whose Signature header does not match its raw body: reject it.
export class WebhookSignatureError extends SolidgateError {
  constructor(message = 'Solidgate: the webhook signature does not match the body: reject the request.') {
    super(message);
  }
}

const BY_STATUS: Record<number, typeof APIError> = {
  400: ValidationError,
  401: AuthenticationError,
  403: PermissionDeniedError,
  404: NotFoundError,
  409: ConflictError,
  422: StateError,
  429: RateLimitError,
};

export function retryAfter(headers: ResponseLike['headers']): Date | undefined {
  const value = headers.get('Retry-After');
  if (!value) return undefined;
  const seconds = Number(value);
  const at = Number.isFinite(seconds) ? new Date(Date.now() + seconds * 1000) : new Date(value);
  return Number.isNaN(at.getTime()) ? undefined : at;
}

export function nextTryAt(
  context: Record<string, unknown> | undefined,
  headers: ResponseLike['headers'],
): Date | undefined {
  const fromBody = typeof context?.next_try_at === 'string' ? new Date(context.next_try_at) : undefined;
  if (fromBody && !Number.isNaN(fromBody.getTime())) return fromBody;
  return retryAfter(headers);
}

// What the SDK reads from an error response. Not `instanceof Response`: a merchant's fetch (npm
// undici for a proxy, node-fetch) returns its own Response class.
export interface ResponseLike {
  readonly status: number;
  readonly statusText?: string;
  readonly headers: { get(name: string): string | null };
  text(): Promise<string>;
}

export function isResponseLike(value: unknown): value is ResponseLike {
  const v = value as Partial<ResponseLike> | null | undefined;
  return typeof v?.status === 'number' && typeof v.text === 'function' && typeof v.headers?.get === 'function';
}

// A load balancer's HTML page or raw JSON would end up in e.message and in merchants' logs; only a
// short one-line text/plain body (a gateway's "Too Many Requests") is readable as a message.
function shortPlainText(text: string, contentType: string | null): string | undefined {
  const line = text.trim();
  const plain = contentType === null || contentType.toLowerCase().startsWith('text/plain');
  return plain && line !== '' && line.length <= 200 && !line.includes('\n') ? line : undefined;
}

export async function errorFromResponse(
  response: ResponseLike,
  call: { idempotencyKey?: string } = {},
): Promise<APIError> {
  const text = await response.text().catch(() => '');
  let body: { code?: unknown; message?: unknown; context?: unknown } = {};
  let json = false;
  try {
    const parsed: unknown = JSON.parse(text);
    json = true;
    if (parsed !== null && typeof parsed === 'object') body = parsed as typeof body;
  } catch {
    // Not JSON: a gateway's text or HTML page.
  }
  const code = typeof body.code === 'string' ? body.code : undefined;
  const context =
    body.context !== null && typeof body.context === 'object' ? (body.context as Record<string, unknown>) : undefined;
  const message =
    (typeof body.message === 'string' && body.message) ||
    (!json && shortPlainText(text, response.headers.get('Content-Type'))) ||
    `HTTP ${response.status} ${response.statusText ?? ''}`.trim();
  const details = {
    status: response.status,
    code,
    context,
    requestId: response.headers.get('Request-Id') ?? undefined,
    idempotencyKey: call.idempotencyKey,
  };
  const ErrorClass =
    response.status === 422 && code === 'IDEMPOTENCY_KEY_REUSED'
      ? IdempotencyKeyReusedError
      : (BY_STATUS[response.status] ?? (response.status >= 500 ? InternalServerError : APIError));
  if (ErrorClass === RateLimitError) {
    return new RateLimitError(message, { ...details, nextTryAt: nextTryAt(context, response.headers) });
  }
  return new ErrorClass(message, details);
}
