# Solidgate Node.js SDK

[![npm](https://img.shields.io/npm/v/@solidgate/node-api-sdk)](https://www.npmjs.com/package/@solidgate/node-api-sdk)
[![license](https://img.shields.io/npm/l/@solidgate/node-api-sdk)](LICENSE.md)

The official Node.js library for the [Solidgate API v2](https://api-docs.solidgate.com/api/v2): customers, payment
instruments, subscriptions, invoices, routing, reports, webhooks and every other resource of the API, fully typed for
TypeScript.

- Typed requests, responses and webhook events, generated from the API Reference
- Automatic retries with backoff, and idempotency keys for safe retries of writes
- Auto-pagination with `for await`
- Webhook signature verification
- CommonJS and ES modules, no runtime dependencies

> The payments API v1 (charge, refund, payment form) is a separate package,
> [`@solidgate/node-sdk`](https://github.com/solidgate-tech/nodejs-sdk). You can install both.

## Documentation

- [API Reference](https://api-docs.solidgate.com/api/v2): every endpoint, field and error code
- [Payment guide](https://docs.solidgate.com/): products and flows
- [Changelog](https://github.com/solidgate-tech/node-api-sdk/blob/master/CHANGELOG.md): what changed in each version

## Requirements

- Node.js 22 or later
- A secret API key from [Solidgate Hub](https://hub.solidgate.com/auth/sign-in): **Developers v2** → **API** → **Keys**

## Installation

```bash
npm install @solidgate/node-api-sdk
# or: pnpm add @solidgate/node-api-sdk / yarn add @solidgate/node-api-sdk
```

## Usage

```ts
import { Solidgate } from '@solidgate/node-api-sdk';
// CommonJS: const { Solidgate } = require('@solidgate/node-api-sdk');

const solidgate = new Solidgate({ apiKey: process.env.SOLIDGATE_API_KEY! });

const customer = await solidgate.customers.createCustomer({
  type: Solidgate.CreateCustomerRequestTypeEnum.Business,
  email: 'jane@example.com',
});

console.log(customer.id);
```

Every API group is a resource on the client (`solidgate.customers`, `solidgate.subscriptions`, `solidgate.invoices`,
`solidgate.reports`, …) with one method per endpoint, named after its operation in the API Reference. Request and
response models are on the `Solidgate` namespace, e.g. `Solidgate.CustomerDomainModel`.

### Configuration

```ts
const solidgate = new Solidgate({
  apiKey: process.env.SOLIDGATE_API_KEY!,
  timeout: 30_000,
  maxRetries: 3,
  appInfo: { name: 'my-shop', version: '1.4.0' },
});
```

| Option       | Default                        | Description                                                                 |
| ------------ | ------------------------------ | --------------------------------------------------------------------------- |
| `apiKey`     | required                       | Secret API key, sent as `Authorization: Bearer <key>`                       |
| `timeout`    | `60000`                        | Milliseconds per attempt, including reading the response; at most `600000` |
| `maxRetries` | `2`                            | Retries after the first attempt (see [Retries](#retries))                   |
| `channelId`  |                                | Added to every request that takes a `channel_id` and has none               |
| `appInfo`    |                                | `{ name, version?, url? }` of your application, added to the User-Agent     |
| `fetch`      | global `fetch`                 | Your own `fetch`, e.g. for a proxy or tests                                 |
| `baseUrl`    | `https://api.solidgate.com/v2` | Another API URL                                                             |

`solidgate.withOptions({ timeout: 5_000 })` returns a copy of the client with some options changed (all but `apiKey`).

### Per-request options

Every method takes the request as its first argument and options for this call only as its second:

```ts
const controller = new AbortController();

await solidgate.customers.getCustomer({ id: 'cus_123' }, { timeout: 10_000, maxRetries: 0, signal: controller.signal });
```

| Option           | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `timeout`        | Milliseconds per attempt for this call                         |
| `maxRetries`     | Retries for this call                                          |
| `signal`         | An `AbortSignal` to cancel the call, retries included          |
| `idempotencyKey` | Your idempotency key, on endpoints that accept one (see below) |

## Pagination

List and search methods return a promise of the first page that is also an async iterable over every item:

```ts
// Every customer, page after page, fetched as you go
for await (const customer of solidgate.customers.listCustomers({})) {
  console.log(customer.id);
}

// The first page only: items and the next page token
const page = await solidgate.customers.listCustomers({ pagination: { page_size: 50 } });

// At most 100 items, as an array
const first100 = await solidgate.customers.listCustomers({}).toArray({ limit: 100 });

// Page by page
for await (const page of solidgate.customers.listCustomers({}).pages()) {
  console.log(page.items.length);
}
```

## Idempotency

Endpoints that accept an `Idempotency-Key` header get one automatically, generated once and reused on every retry, so
a retried write is never applied twice. Pass your own key to make a call safe to repeat later, e.g. after a restart:

```ts
const invoice = await solidgate.invoices.createInvoice(params, { idempotencyKey: `order-${order.id}` });

invoice.responseDetails.idempotency?.replayed; // true when the API returned the result of an earlier call
```

Reusing a key with a different request body throws `Solidgate.IdempotencyKeyReusedError`.

## Retries

Failed calls are retried up to `maxRetries` times (default `2`) with exponential backoff and jitter:

- **Network errors**: reads and writes with an idempotency key are retried; a write without one only when the request
  never reached the API.
- **`429 Too Many Requests`**: retried after the wait the API asks for (up to 60 seconds).
- **`5xx`**: reads only. A write may already have been applied, so it fails with the error instead.

Set `maxRetries: 0` to turn retries off.

## Response details

Every result has a `responseDetails` property with the HTTP details of the response:

```ts
const customer = await solidgate.customers.getCustomer({ id: 'cus_123' });

customer.responseDetails.requestId; // include it when you contact Solidgate support
customer.responseDetails.statusCode; // 200
customer.responseDetails.headers.get('content-type');
```

## Report downloads

`solidgate.reports.downloadReport()` does not return the report file. It returns a short-lived download link
(`url`), and you download the file from it with a plain request, for example straight to disk:

```ts
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { ReadableStream } from 'node:stream/web';

const { url } = await solidgate.reports.downloadReport({ id: report.id });

const response = await fetch(url); // the link needs no API key
await pipeline(Readable.fromWeb(response.body as ReadableStream), createWriteStream('report.csv'));
```

The link expires soon after it is issued: download right away, or call `downloadReport()` again for a new one. The SDK
does not follow the link itself, so your API key is never sent to the file host.

## Error handling

Every error the SDK throws is a `Solidgate.SolidgateError`. API errors have `status`, `code`, `message` and
`requestId`; handle them by class:

```ts
try {
  await solidgate.customers.getCustomer({ id: 'cus_123' });
} catch (error) {
  if (error instanceof Solidgate.NotFoundError) {
    // no such customer
  } else if (error instanceof Solidgate.ValidationError) {
    console.error(error.fieldErrors); // { email: { type, message }, ... }
  } else if (error instanceof Solidgate.APIError) {
    console.error(error.status, error.code, error.requestId);
  } else {
    throw error;
  }
}
```

| Class                       | When                                                           |
| --------------------------- | -------------------------------------------------------------- |
| `ValidationError`           | `400`: invalid request; `fieldErrors` names each invalid field |
| `AuthenticationError`       | `401`: missing or wrong API key                                |
| `PermissionDeniedError`     | `403`: the key may not do this                                 |
| `NotFoundError`             | `404`                                                          |
| `ConflictError`             | `409`                                                          |
| `StateError`                | `422`: the object's state does not allow the operation         |
| `IdempotencyKeyReusedError` | `422`: an idempotency key reused with a different body         |
| `RateLimitError`            | `429`, after retries; `nextTryAt` says when to try again       |
| `InternalServerError`       | `5xx`                                                          |
| `ConnectionError`           | no response: network error                                     |
| `TimeoutError`              | no response in `timeout` (a `ConnectionError`)                 |
| `WebhookSignatureError`     | a webhook that does not verify (see [Webhooks](#webhooks))     |

API errors extend `Solidgate.APIError`; all errors extend `Solidgate.SolidgateError`. The error codes are listed in the
[API Reference](https://api-docs.solidgate.com/api/v2/get-started#error-handling).

## Webhooks

`constructEvent` verifies the signature and returns the typed event. Pass the raw request body: a body that was parsed
and serialized again no longer matches its signature.

```ts
import express from 'express';
import { Solidgate } from '@solidgate/node-api-sdk';

const webhooks = new Solidgate.Webhooks({ secret: process.env.SOLIDGATE_WEBHOOK_SECRET! });
const app = express();

app.post('/webhooks/solidgate', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    event = await webhooks.constructEvent(req.body, req.headers);
  } catch (error) {
    return res.sendStatus(400); // wrong signature or body
  }

  if (webhooks.isKnownEvent(event)) {
    switch (event.event_type) {
      case 'INVOICE_PAID':
        console.log(event.data.invoice.id); // typed for this event
        break;
    }
  }
  res.sendStatus(200);
});
```

- **Typed events**: `isKnownEvent` narrows the event, so `event.data` has the right type for each `event_type`. An
  event type newer than your SDK version comes back as an `UnknownEvent` with its raw data instead of an error.
- **Duplicates**: a webhook may be delivered more than once. Deduplicate on the `solidgate-event-id` header (the same
  value as `event.event_id`) and keep processed IDs for at least 7 days.
- **Secret rotation**: pass both secrets while you switch: `new Solidgate.Webhooks({ secret: [newSecret, oldSecret] })`.
- **Testing**: `Solidgate.signPayload(body, secret)` returns the `signature` header for a body, so your tests can send
  signed webhooks.

## TypeScript

The package ships its type declarations. Every request, response and event model is exported on the `Solidgate`
namespace:

```ts
import { Solidgate } from '@solidgate/node-api-sdk';

function describe(customer: Solidgate.CustomerDomainModel): string {
  return `${customer.id}: ${customer.email}`;
}
```

## Versioning

This package follows [semantic versioning](https://semver.org/). While the version is `0.x`, a breaking change raises
the minor version (`0.2.0` → `0.3.0`) and everything else the patch version, so `^0.2.0` never brings a breaking
change. From `1.0.0`, breaking changes raise the major version. Every release is listed in the
[changelog](https://github.com/solidgate-tech/node-api-sdk/blob/master/CHANGELOG.md) and on [GitHub Releases](https://github.com/solidgate-tech/node-api-sdk/releases).

## Support

Looking for help? [Contact us](https://support.solidgate.com/en/support/tickets/new). Include the `requestId` of the
failing call, from `responseDetails.requestId` or the error's `requestId`.

Found a bug in this library? Open a [GitHub issue](https://github.com/solidgate-tech/node-api-sdk/issues).

## License

[Apache-2.0](LICENSE.md)
