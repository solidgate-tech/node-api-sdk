# Changelog

All notable changes to this package are documented in this file.

## [0.2.0] - 2026-11-18

- **Breaking:** [`POST /antifraud-lists/create-item`](https://api-docs.solidgate.com/api/v2/antifraud-lists/create-item-antifraud-list):
  - **Breaking:** The `list_id` request property's maxLength was decreased to `100`.
  - The `id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
  - The `list_id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
- **Breaking:** [`POST /antifraud-lists/delete-item`](https://api-docs.solidgate.com/api/v2/antifraud-lists/delete-item-antifraud-list):
  - **Breaking:** The `id` request property's maxLength was decreased to `100`.
- **Breaking:** [`POST /antifraud-lists/get`](https://api-docs.solidgate.com/api/v2/antifraud-lists/get-antifraud-list):
  - **Breaking:** The `id` request property's maxLength was decreased to `100`.
  - The `id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
- **Breaking:** [`POST /antifraud-lists/update`](https://api-docs.solidgate.com/api/v2/antifraud-lists/update-antifraud-list):
  - **Breaking:** The `id` request property's maxLength was decreased to `100`.
  - The `id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
- [`POST /antifraud-lists/list-item`](https://api-docs.solidgate.com/api/v2/antifraud-lists/list-item-antifraud-list):
  - The `allOf[subschema #1]/list_id` request property's maxLength was decreased to `100`.
  - The `allOf[subschema #1]/items/items/id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
  - The `allOf[subschema #1]/items/items/list_id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
- `POST webhook:AntifraudResultCreated`:
  - The `allOf[subschema #2]/data/antifraud_result/matched_lists/items/list_id` request property's maxLength was decreased to `100`.
  - The `allOf[subschema #2]/data/antifraud_result/matched_lists/items/list_item_id` request property's maxLength was decreased to `100`.
- [`POST /antifraud-lists/create`](https://api-docs.solidgate.com/api/v2/antifraud-lists/create-antifraud-list):
  - The `id` response property's maxLength was decreased from `250` to `100` for the response status `200`.
- [`POST /antifraud-lists/list`](https://api-docs.solidgate.com/api/v2/antifraud-lists/list-antifraud-list):
  - The `allOf[subschema #1]/items/items/id` response property's maxLength was decreased from `250` to `100` for the response status `200`.

## [0.1.5] - 2026-11-16

- New [`POST /subscriptions/delete`](https://api-docs.solidgate.com/api/v2/subscriptions/delete-subscription): Delete subscription.

## [0.1.4] - 2026-11-12

- [`POST /invoices/create`](https://api-docs.solidgate.com/api/v2/invoices/create-invoice):
  - Added the new `CUSTOMER_NOT_ACTIVE` enum value to `code`.

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
