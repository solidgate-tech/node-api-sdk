# Changelog

All notable changes to this package are documented in this file.

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
