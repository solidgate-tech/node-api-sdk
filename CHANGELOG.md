# Changelog

All notable changes to this package are documented in this file.

## [0.1.3] - 2026-11-11

- [`POST /customers/create`](https://api-docs.solidgate.com/api/v2/customers/create-customer):
  - The request's body `type` changed from `any` to `object`.
- [`POST /payment-instruments/get`](https://api-docs.solidgate.com/api/v2/payment-instruments/get-payment-instrument):
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- [`POST /payment-instruments/list`](https://api-docs.solidgate.com/api/v2/payment-instruments/list-payment-instruments):
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- [`POST /payment-instruments/revoke`](https://api-docs.solidgate.com/api/v2/payment-instruments/revoke-payment-instrument):
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- `POST webhook:PaymentInstrumentCreated`:
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- `POST webhook:PaymentInstrumentExpired`:
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- `POST webhook:PaymentInstrumentRevoked`:
  - Added the new `TOKEN_REVOKED` enum value to `revocation_reason`.
- [`POST /invoices/create`](https://api-docs.solidgate.com/api/v2/invoices/create-invoice):
  - Removed the request property `line_items/items/description`.
  - Removed the request property `line_items/items/product_price_id`.
  - Removed the request property `line_items/items/quantity`.
  - Added `subschema #1: Product price` to the `line_items/items/` request property `oneOf` list.
- [`POST /invoices/update`](https://api-docs.solidgate.com/api/v2/invoices/update-invoice):
  - Removed the request property `line_items/items/description`.
  - Removed the request property `line_items/items/product_price_id`.
  - Removed the request property `line_items/items/quantity`.
  - Added `subschema #1: Product price` to the `line_items/items/` request property `oneOf` list.

## [0.1.2] - 2026-11-10

- [`POST /invoices/search`](https://api-docs.solidgate.com/api/v2/invoices/search-invoices):
  - Removed the request property `allOf[subschema #1]/filters/customer_email/operator`.
  - Removed the request property `allOf[subschema #1]/filters/customer_email/value`.
  - Added `subschema #1: Email equals, subschema #2: Email starts with` to the `allOf[subschema #1]/filters/customer_email` request property `oneOf` list.
- [`POST /subscriptions/search`](https://api-docs.solidgate.com/api/v2/subscriptions/search-subscriptions):
  - Removed the request property `allOf[subschema #1]/filters/customer_email/operator`.
  - Removed the request property `allOf[subschema #1]/filters/customer_email/value`.
  - Added `subschema #1: Email equals, subschema #2: Email starts with` to the `allOf[subschema #1]/filters/customer_email` request property `oneOf` list.

## [0.1.1] - 2026-11-09

- [`POST /invoices/search`](https://api-docs.solidgate.com/api/v2/invoices/search-invoices):
  - Added the pattern `^.*\S.*$` to the request property `allOf[subschema #1]/filters/customer_email/value`.
  - Added the new `STARTS_WITH` enum value to `operator`.
  - The `allOf[subschema #1]/filters/customer_email/value` request property `format` was widened from `email` to `none`.
- [`POST /subscriptions/search`](https://api-docs.solidgate.com/api/v2/subscriptions/search-subscriptions):
  - Added the pattern `^.*\S.*$` to the request property `allOf[subschema #1]/filters/customer_email/value`.
  - Added the new `STARTS_WITH` enum value to `operator`.
  - The `allOf[subschema #1]/filters/customer_email/value` request property `format` was widened from `email` to `none`.

## [0.1.0] - 2026-11-09

- Initial release.
