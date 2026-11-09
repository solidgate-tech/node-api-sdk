import './namespace';

export { Solidgate } from './generated/solidgate';
export { SOLIDGATE_BASE_URL } from './client';
// Types only, so the API report tracks the call shape; the namespace re-exports them for merchants.
export type { AppInfo, OptionsOf, Resource, SolidgateOptions } from './client';
export type {
  IdempotencyDetails,
  IdempotentRequestOptions,
  RedirectResult,
  RequestOptions,
  ResponseDetails,
  WithResponseDetails,
} from './call';
export type {
  APIError,
  AuthenticationError,
  ConflictError,
  ConnectionError,
  FieldError,
  IdempotencyKeyReusedError,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  SolidgateError,
  StateError,
  ValidationError,
  WebhookSignatureError,
} from './errors';
export type { ItemOf, ListPage, PagePromise } from './pagination';
export type { RawBody, SignatureHeader, signPayload, verifySignature } from './signature';
export type { HeadersLike, Webhooks, WebhooksOptions } from './webhooks';
