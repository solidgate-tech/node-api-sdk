import { SolidgateError, WebhookSignatureError } from './errors';
import { isKnownEvent, parseEvent, type SolidgateEvent, type UnknownEvent } from './generated/webhooks';
import { assertWebhookSecrets, rawBodyBytes, verifySignature, type RawBody } from './signature';

export type HeadersLike = Headers | Readonly<Record<string, string | readonly string[] | undefined>>;

export interface WebhooksOptions {
  secret: string | readonly string[];
}

function header(headers: HeadersLike, name: string): string | readonly string[] | undefined {
  if (typeof (headers as Headers).get === 'function') return (headers as Headers).get(name) ?? undefined;
  const record = headers as Record<string, string | readonly string[] | undefined>;
  const key = Object.keys(record).find((k) => k.toLowerCase() === name);
  return key === undefined ? undefined : record[key];
}

export class Webhooks {
  readonly #secrets: readonly string[];

  constructor(options: WebhooksOptions) {
    assertWebhookSecrets(options?.secret);
    this.#secrets = Object.freeze(typeof options.secret === 'string' ? [options.secret] : [...options.secret]);
  }

  async constructEvent(rawBody: RawBody, headers: HeadersLike): Promise<SolidgateEvent | UnknownEvent> {
    if (!(await verifySignature(rawBody, header(headers, 'signature'), this.#secrets))) {
      throw new WebhookSignatureError();
    }
    let json: unknown;
    try {
      json = JSON.parse(new TextDecoder().decode(rawBodyBytes(rawBody)));
    } catch (cause) {
      throw new SolidgateError('Solidgate: the webhook body is not JSON.', { cause });
    }
    // Solidgate always sends an object; a merchant's own test signed with signPayload may not.
    if (json === null || typeof json !== 'object' || Array.isArray(json)) {
      throw new SolidgateError('Solidgate: the webhook body is not a JSON object.');
    }
    try {
      return parseEvent(json);
    } catch (cause) {
      // The generated model mappers throw a bare TypeError on a body that breaks the spec.
      const type = String((json as { event_type?: unknown }).event_type);
      throw new SolidgateError(`Solidgate: the webhook body does not match the ${type} event.`, { cause });
    }
  }

  isKnownEvent(event: SolidgateEvent | UnknownEvent): event is SolidgateEvent {
    return isKnownEvent(event);
  }
}
