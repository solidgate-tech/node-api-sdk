import type { PagePromise } from './pagination';
import type {
  IdempotencyDetails,
  IdempotentRequestOptions,
  RedirectResult,
  RequestOptions,
  ResponseDetails,
} from './call';
import * as errors from './errors';
import { Solidgate } from './generated/solidgate';
import * as signature from './signature';
import * as webhooks from './webhooks';

// SDK additions to the generated Solidgate namespace: Solidgate.APIError, Solidgate.verifySignature, ...
declare module './generated/solidgate' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Solidgate {
    export type {
      IdempotencyDetails,
      IdempotentRequestOptions,
      PagePromise,
      RedirectResult,
      RequestOptions,
      ResponseDetails,
    };
    export type FieldError = errors.FieldError;
    export import SolidgateError = errors.SolidgateError;
    export import APIError = errors.APIError;
    export import ValidationError = errors.ValidationError;
    export import AuthenticationError = errors.AuthenticationError;
    export import PermissionDeniedError = errors.PermissionDeniedError;
    export import NotFoundError = errors.NotFoundError;
    export import ConflictError = errors.ConflictError;
    export import StateError = errors.StateError;
    export import IdempotencyKeyReusedError = errors.IdempotencyKeyReusedError;
    export import RateLimitError = errors.RateLimitError;
    export import InternalServerError = errors.InternalServerError;
    export import ConnectionError = errors.ConnectionError;
    export import TimeoutError = errors.TimeoutError;
    export import WebhookSignatureError = errors.WebhookSignatureError;
    export type RawBody = signature.RawBody;
    export type SignatureHeader = signature.SignatureHeader;
    export import verifySignature = signature.verifySignature;
    export import signPayload = signature.signPayload;
    export type HeadersLike = webhooks.HeadersLike;
    export type WebhooksOptions = webhooks.WebhooksOptions;
    export import Webhooks = webhooks.Webhooks;
  }
}

Object.assign(Solidgate, {
  SolidgateError: errors.SolidgateError,
  APIError: errors.APIError,
  ValidationError: errors.ValidationError,
  AuthenticationError: errors.AuthenticationError,
  PermissionDeniedError: errors.PermissionDeniedError,
  NotFoundError: errors.NotFoundError,
  ConflictError: errors.ConflictError,
  StateError: errors.StateError,
  IdempotencyKeyReusedError: errors.IdempotencyKeyReusedError,
  RateLimitError: errors.RateLimitError,
  InternalServerError: errors.InternalServerError,
  ConnectionError: errors.ConnectionError,
  TimeoutError: errors.TimeoutError,
  WebhookSignatureError: errors.WebhookSignatureError,
  verifySignature: signature.verifySignature,
  signPayload: signature.signPayload,
  Webhooks: webhooks.Webhooks,
});
