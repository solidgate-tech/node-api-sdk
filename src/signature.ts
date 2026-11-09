export type RawBody = string | ArrayBuffer | ArrayBufferView;

export type SignatureHeader = string | readonly string[] | null | undefined;

export function assertWebhookSecrets(secret: unknown): asserts secret is string | readonly string[] {
  const secrets = typeof secret === 'string' ? [secret] : Array.isArray(secret) ? secret : [];
  // Presence only, never the format: a new secret format must not need an SDK release.
  if (secrets.length === 0 || secrets.some((s) => typeof s !== 'string' || s.trim() === '')) {
    throw new TypeError('Solidgate: the webhook secret is required: the endpoint secret from the Solidgate Hub.');
  }
}

export function rawBodyBytes(body: RawBody): Uint8Array {
  if (typeof body === 'string') return new TextEncoder().encode(body);
  if (body instanceof ArrayBuffer) return new Uint8Array(body);
  if (ArrayBuffer.isView(body)) return new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
  throw new TypeError(
    'Solidgate: the webhook body must be the raw request body (string, Buffer or Uint8Array), not a parsed object.',
  );
}

// During a secret rotation a delivery has two Signature headers, one per secret, the new one first
// (API reference, signatureAuth); some frameworks join repeated headers with commas.
function parseSignatures(header: SignatureHeader): Uint8Array[] {
  const values = typeof header === 'string' ? [header] : (header ?? []);
  return values
    .flatMap((value) => String(value).split(','))
    .map((value) => decodeBase64(value.trim()))
    .filter((s): s is Uint8Array => s !== undefined && s.length === 32);
}

function decodeBase64(value: string): Uint8Array | undefined {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return undefined;
  try {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  } catch {
    return undefined;
  }
}

function hmacKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  const encoded = new TextEncoder().encode(secret);
  return globalThis.crypto.subtle.importKey('raw', encoded, { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

export async function verifySignature(
  rawBody: RawBody,
  signature: SignatureHeader,
  secret: string | readonly string[],
): Promise<boolean> {
  assertWebhookSecrets(secret);
  const data = rawBodyBytes(rawBody);
  const signatures = parseSignatures(signature);
  let valid = false;
  // subtle.verify compares in constant time; every pair is checked so timing does not tell which matched.
  for (const s of typeof secret === 'string' ? [secret] : secret) {
    const key = await hmacKey(s, 'verify');
    for (const candidate of signatures) {
      if (await globalThis.crypto.subtle.verify('HMAC', key, candidate, data)) valid = true;
    }
  }
  return valid;
}

export async function signPayload(rawBody: RawBody, secret: string): Promise<string> {
  assertWebhookSecrets(secret);
  const mac = await globalThis.crypto.subtle.sign('HMAC', await hmacKey(secret, 'sign'), rawBodyBytes(rawBody));
  return btoa(String.fromCharCode(...new Uint8Array(mac)));
}
