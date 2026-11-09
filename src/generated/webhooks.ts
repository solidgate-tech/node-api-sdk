/* tslint:disable */
/* eslint-disable */
import {
    type EventEnvelope,
    EventEnvelopeFromJSON,
    type AntifraudResultCreatedEventModel,
    AntifraudResultCreatedEventModelFromJSON,
    type CustomerCreatedEventModel,
    CustomerCreatedEventModelFromJSON,
    type CustomerUpdatedEventModel,
    CustomerUpdatedEventModelFromJSON,
    type FraudAlertReceivedEventModel,
    FraudAlertReceivedEventModelFromJSON,
    type InvoiceCreatedEventModel,
    InvoiceCreatedEventModelFromJSON,
    type InvoiceDeletedEventModel,
    InvoiceDeletedEventModelFromJSON,
    type InvoiceDunningStartedEventModel,
    InvoiceDunningStartedEventModelFromJSON,
    type InvoiceFinalizationFailedEventModel,
    InvoiceFinalizationFailedEventModelFromJSON,
    type InvoiceFinalizedEventModel,
    InvoiceFinalizedEventModelFromJSON,
    type InvoicePaidEventModel,
    InvoicePaidEventModelFromJSON,
    type InvoicePaymentFailedEventModel,
    InvoicePaymentFailedEventModelFromJSON,
    type InvoiceUnpaidEventModel,
    InvoiceUnpaidEventModelFromJSON,
    type InvoiceUpdatedEventModel,
    InvoiceUpdatedEventModelFromJSON,
    type InvoiceVoidedEventModel,
    InvoiceVoidedEventModelFromJSON,
    type PaymentInstrumentCreatedEventModel,
    PaymentInstrumentCreatedEventModelFromJSON,
    type PaymentInstrumentExpiredEventModel,
    PaymentInstrumentExpiredEventModelFromJSON,
    type PaymentInstrumentRevokedEventModel,
    PaymentInstrumentRevokedEventModelFromJSON,
    type PreventionAlertReceivedEventModel,
    PreventionAlertReceivedEventModelFromJSON,
    type ReportGeneratedEventModel,
    ReportGeneratedEventModelFromJSON,
    type RoutingConfigVersionPublishedEventModel,
    RoutingConfigVersionPublishedEventModelFromJSON,
    type SubscriptionActivatedEventModel,
    SubscriptionActivatedEventModelFromJSON,
    type SubscriptionCancelledEventModel,
    SubscriptionCancelledEventModelFromJSON,
    type SubscriptionCreatedEventModel,
    SubscriptionCreatedEventModelFromJSON,
    type SubscriptionExpiredEventModel,
    SubscriptionExpiredEventModelFromJSON,
    type SubscriptionPausedEventModel,
    SubscriptionPausedEventModelFromJSON,
    type SubscriptionRedemptionStartedEventModel,
    SubscriptionRedemptionStartedEventModelFromJSON,
    type SubscriptionRenewedEventModel,
    SubscriptionRenewedEventModelFromJSON,
    type SubscriptionResumedEventModel,
    SubscriptionResumedEventModelFromJSON,
    type SubscriptionScheduledForCancellationEventModel,
    SubscriptionScheduledForCancellationEventModelFromJSON,
    type SubscriptionScheduledForPauseEventModel,
    SubscriptionScheduledForPauseEventModelFromJSON,
    type SubscriptionTrialActivatedEventModel,
    SubscriptionTrialActivatedEventModelFromJSON,
    type SubscriptionUnpaidEventModel,
    SubscriptionUnpaidEventModelFromJSON,
    type SubscriptionUpdatedEventModel,
    SubscriptionUpdatedEventModelFromJSON,
} from './models/index';

// never keeps the union valid when the spec has no events.
export type SolidgateEvent =
    | never
    | AntifraudResultCreatedEventModel
    | CustomerCreatedEventModel
    | CustomerUpdatedEventModel
    | FraudAlertReceivedEventModel
    | InvoiceCreatedEventModel
    | InvoiceDeletedEventModel
    | InvoiceDunningStartedEventModel
    | InvoiceFinalizationFailedEventModel
    | InvoiceFinalizedEventModel
    | InvoicePaidEventModel
    | InvoicePaymentFailedEventModel
    | InvoiceUnpaidEventModel
    | InvoiceUpdatedEventModel
    | InvoiceVoidedEventModel
    | PaymentInstrumentCreatedEventModel
    | PaymentInstrumentExpiredEventModel
    | PaymentInstrumentRevokedEventModel
    | PreventionAlertReceivedEventModel
    | ReportGeneratedEventModel
    | RoutingConfigVersionPublishedEventModel
    | SubscriptionActivatedEventModel
    | SubscriptionCancelledEventModel
    | SubscriptionCreatedEventModel
    | SubscriptionExpiredEventModel
    | SubscriptionPausedEventModel
    | SubscriptionRedemptionStartedEventModel
    | SubscriptionRenewedEventModel
    | SubscriptionResumedEventModel
    | SubscriptionScheduledForCancellationEventModel
    | SubscriptionScheduledForPauseEventModel
    | SubscriptionTrialActivatedEventModel
    | SubscriptionUnpaidEventModel
    | SubscriptionUpdatedEventModel
    ;

export type SolidgateEventType = SolidgateEvent['event_type'];

export type UnknownEvent = EventEnvelope;

const parsers: { readonly [eventType: string]: (json: any) => SolidgateEvent } = {
    'ANTIFRAUD_RESULT_CREATED': AntifraudResultCreatedEventModelFromJSON,
    'CUSTOMER_CREATED': CustomerCreatedEventModelFromJSON,
    'CUSTOMER_UPDATED': CustomerUpdatedEventModelFromJSON,
    'FRAUD_ALERT_RECEIVED': FraudAlertReceivedEventModelFromJSON,
    'INVOICE_CREATED': InvoiceCreatedEventModelFromJSON,
    'INVOICE_DELETED': InvoiceDeletedEventModelFromJSON,
    'INVOICE_DUNNING_STARTED': InvoiceDunningStartedEventModelFromJSON,
    'INVOICE_FINALIZATION_FAILED': InvoiceFinalizationFailedEventModelFromJSON,
    'INVOICE_FINALIZED': InvoiceFinalizedEventModelFromJSON,
    'INVOICE_PAID': InvoicePaidEventModelFromJSON,
    'INVOICE_PAYMENT_FAILED': InvoicePaymentFailedEventModelFromJSON,
    'INVOICE_UNPAID': InvoiceUnpaidEventModelFromJSON,
    'INVOICE_UPDATED': InvoiceUpdatedEventModelFromJSON,
    'INVOICE_VOIDED': InvoiceVoidedEventModelFromJSON,
    'PAYMENT_INSTRUMENT_CREATED': PaymentInstrumentCreatedEventModelFromJSON,
    'PAYMENT_INSTRUMENT_EXPIRED': PaymentInstrumentExpiredEventModelFromJSON,
    'PAYMENT_INSTRUMENT_REVOKED': PaymentInstrumentRevokedEventModelFromJSON,
    'PREVENTION_ALERT_RECEIVED': PreventionAlertReceivedEventModelFromJSON,
    'REPORT_GENERATED': ReportGeneratedEventModelFromJSON,
    'ROUTING_CONFIG_VERSION_PUBLISHED': RoutingConfigVersionPublishedEventModelFromJSON,
    'SUBSCRIPTION_ACTIVATED': SubscriptionActivatedEventModelFromJSON,
    'SUBSCRIPTION_CANCELLED': SubscriptionCancelledEventModelFromJSON,
    'SUBSCRIPTION_CREATED': SubscriptionCreatedEventModelFromJSON,
    'SUBSCRIPTION_EXPIRED': SubscriptionExpiredEventModelFromJSON,
    'SUBSCRIPTION_PAUSED': SubscriptionPausedEventModelFromJSON,
    'SUBSCRIPTION_REDEMPTION_STARTED': SubscriptionRedemptionStartedEventModelFromJSON,
    'SUBSCRIPTION_RENEWED': SubscriptionRenewedEventModelFromJSON,
    'SUBSCRIPTION_RESUMED': SubscriptionResumedEventModelFromJSON,
    'SUBSCRIPTION_SCHEDULED_FOR_CANCELLATION': SubscriptionScheduledForCancellationEventModelFromJSON,
    'SUBSCRIPTION_SCHEDULED_FOR_PAUSE': SubscriptionScheduledForPauseEventModelFromJSON,
    'SUBSCRIPTION_TRIAL_ACTIVATED': SubscriptionTrialActivatedEventModelFromJSON,
    'SUBSCRIPTION_UNPAID': SubscriptionUnpaidEventModelFromJSON,
    'SUBSCRIPTION_UPDATED': SubscriptionUpdatedEventModelFromJSON,
};

// Through unknown: string[] does not cast to never[] when the spec has no events.
export const SOLIDGATE_EVENT_TYPES = Object.keys(parsers) as unknown as ReadonlyArray<SolidgateEventType>;

/**
 * Parses a webhook body that is already JSON.parse'd. Verify the signature first.
 * An event_type this SDK version does not know comes back as an UnknownEvent: check
 * isKnownEvent() before switching on event_type.
 */
export function parseEvent(json: any): SolidgateEvent | UnknownEvent {
    const parse = Object.prototype.hasOwnProperty.call(parsers, json?.event_type) ? parsers[json.event_type] : undefined;
    return parse ? parse(json) : EventEnvelopeFromJSON(json);
}

/** True when this SDK version knows the event's event_type; narrows the event to SolidgateEvent. */
export function isKnownEvent(event: SolidgateEvent | UnknownEvent): event is SolidgateEvent {
    return Object.prototype.hasOwnProperty.call(parsers, event.event_type);
}
