/* tslint:disable */
/* eslint-disable */
import * as apis from './apis/index';
import * as models from './models/index';
import * as webhooks from './webhooks';
import * as runtime from './runtime';
import { SolidgateClient, type Resource, type SolidgateOptions } from '../client';

export const RESOURCES = {
    apiKeys: apis.APIKeysApi,
    antifraudLists: apis.AntifraudListsApi,
    channels: apis.ChannelsApi,
    connectorAccounts: apis.ConnectorAccountsApi,
    customers: apis.CustomersApi,
    financialInvoices: apis.FinancialInvoicesApi,
    invoices: apis.InvoicesApi,
    legalEntities: apis.LegalEntitiesApi,
    monthlyStatements: apis.MonthlyStatementsApi,
    paymentInstruments: apis.PaymentInstrumentsApi,
    reports: apis.ReportsApi,
    routing: apis.RoutingApi,
    settlements: apis.SettlementsApi,
    subscriptions: apis.SubscriptionsApi,
    webhooks: apis.WebhooksApi,
} as const;

// Each method's positional parameters: 'body', 'header:<name>' (e.g. 'header:Idempotency-Key'), or
// the parameter's name. The SDK places its arguments by these, not by the methods' arity.
export const PARAMS = {
    apiKeys: {
        createApiKey: ['body', 'header:Idempotency-Key'],
        getApiKey: ['body'],
        listApiKey: ['body'],
        rotateApiKey: ['body', 'header:Idempotency-Key'],
    },
    antifraudLists: {
        createAntifraudList: ['body', 'header:Idempotency-Key'],
        createItemAntifraudList: ['body', 'header:Idempotency-Key'],
        deleteItemAntifraudList: ['body', 'header:Idempotency-Key'],
        getAntifraudList: ['body'],
        listAntifraudList: ['body'],
        listItemAntifraudList: ['body'],
        updateAntifraudList: ['body', 'header:Idempotency-Key'],
    },
    channels: {
        listChannel: ['body'],
    },
    connectorAccounts: {
        getConnectorAccount: ['body'],
        listConnectorAccountDescriptors: ['body'],
        listConnectorAccounts: ['body'],
    },
    customers: {
        createCustomer: ['body', 'header:Idempotency-Key'],
        getCustomer: ['body'],
        listCustomers: ['body'],
        updateCustomer: ['body', 'header:Idempotency-Key'],
    },
    financialInvoices: {
        getFinancialInvoice: ['body'],
        listFinancialInvoices: ['body'],
    },
    invoices: {
        createInvoice: ['body', 'header:Idempotency-Key'],
        deleteInvoice: ['body', 'header:Idempotency-Key'],
        finalizeInvoice: ['body', 'header:Idempotency-Key'],
        getInvoice: ['body'],
        listInvoices: ['body'],
        payInvoice: ['body', 'header:Idempotency-Key'],
        searchInvoices: ['body'],
        updateInvoice: ['body', 'header:Idempotency-Key'],
        voidInvoice: ['body', 'header:Idempotency-Key'],
    },
    legalEntities: {
        getLegalEntity: ['body'],
        listLegalEntities: ['body'],
    },
    monthlyStatements: {
        getMonthlyStatement: ['body'],
        listMonthlyStatements: ['body'],
    },
    paymentInstruments: {
        getPaymentInstrument: ['body'],
        listPaymentInstruments: ['body'],
        revokePaymentInstrument: ['body', 'header:Idempotency-Key'],
    },
    reports: {
        createReport: ['body', 'header:Idempotency-Key'],
        downloadReport: ['body'],
        getReport: ['body'],
        listReports: ['body'],
    },
    routing: {
        getRoutingConfig: ['body'],
        getRoutingConfigVersion: ['body'],
        listRoutingConfigs: ['body'],
    },
    settlements: {
        getSettlement: ['body'],
        listSettlements: ['body'],
    },
    subscriptions: {
        cancelSubscription: ['body', 'header:Idempotency-Key'],
        createSubscription: ['body', 'header:Idempotency-Key'],
        deleteSubscriptionCancellation: ['body', 'header:Idempotency-Key'],
        deleteSubscriptionPause: ['body', 'header:Idempotency-Key'],
        getSubscription: ['body'],
        listSubscriptions: ['body'],
        pauseSubscription: ['body', 'header:Idempotency-Key'],
        searchSubscriptions: ['body'],
        updateSubscription: ['body', 'header:Idempotency-Key'],
    },
    webhooks: {
        createWebhook: ['body', 'header:Idempotency-Key'],
        deleteWebhook: ['body', 'header:Idempotency-Key'],
        getWebhook: ['body'],
        listWebhook: ['body'],
        rotateWebhookKey: ['body', 'header:Idempotency-Key'],
        updateWebhook: ['body', 'header:Idempotency-Key'],
    },
} as const;

export interface Solidgate {
    readonly apiKeys: Resource<apis.APIKeysApi>;
    readonly antifraudLists: Resource<apis.AntifraudListsApi>;
    readonly channels: Resource<apis.ChannelsApi>;
    readonly connectorAccounts: Resource<apis.ConnectorAccountsApi>;
    readonly customers: Resource<apis.CustomersApi>;
    readonly financialInvoices: Resource<apis.FinancialInvoicesApi>;
    readonly invoices: Resource<apis.InvoicesApi>;
    readonly legalEntities: Resource<apis.LegalEntitiesApi>;
    readonly monthlyStatements: Resource<apis.MonthlyStatementsApi>;
    readonly paymentInstruments: Resource<apis.PaymentInstrumentsApi>;
    readonly reports: Resource<apis.ReportsApi>;
    readonly routing: Resource<apis.RoutingApi>;
    readonly settlements: Resource<apis.SettlementsApi>;
    readonly subscriptions: Resource<apis.SubscriptionsApi>;
    readonly webhooks: Resource<apis.WebhooksApi>;
}

export class Solidgate extends SolidgateClient {
    constructor(options: Solidgate.Options) {
        super({ Configuration: runtime.Configuration, resources: RESOURCES, params: PARAMS }, options);
    }
}

export namespace Solidgate {
    export type Options = SolidgateOptions;
    export import ResponseError = runtime.ResponseError;
    export import FetchError = runtime.FetchError;
    export import RequiredError = runtime.RequiredError;
    export import AcquiringBankModel = models.AcquiringBankModel;
    export import Address = models.Address;
    export import AddressWithState = models.AddressWithState;
    export import AddressWithStateCountryEnum = models.AddressWithStateCountryEnum;
    export import AntifraudDecisionEnum = models.AntifraudDecisionEnum;
    export import AntifraudFieldEnum = models.AntifraudFieldEnum;
    export import AntifraudListDomainModel = models.AntifraudListDomainModel;
    export import AntifraudListItemDomainModel = models.AntifraudListItemDomainModel;
    export import AntifraudPhaseEnum = models.AntifraudPhaseEnum;
    export import AntifraudResultCreatedEventModel = models.AntifraudResultCreatedEventModel;
    export import AntifraudResultCreatedEventModelEventTypeEnum = models.AntifraudResultCreatedEventModelEventTypeEnum;
    export import AntifraudResultCreatedEventModelData = models.AntifraudResultCreatedEventModelData;
    export import AntifraudResultDomainModel = models.AntifraudResultDomainModel;
    export import AntifraudResultDomainModelMatchedListsInner = models.AntifraudResultDomainModelMatchedListsInner;
    export import AntifraudResultDomainModelMatchedRulesInner = models.AntifraudResultDomainModelMatchedRulesInner;
    export import ApiKeyDomainModel = models.ApiKeyDomainModel;
    export import Auto = models.Auto;
    export import AutoModeEnum = models.AutoModeEnum;
    export import Balance = models.Balance;
    export import BillingPaymentMethodEnum = models.BillingPaymentMethodEnum;
    export import BusinessDetails = models.BusinessDetails;
    export import BusinessDetailsLegalAddress = models.BusinessDetailsLegalAddress;
    export import CalendarDateFilterRangeValue = models.CalendarDateFilterRangeValue;
    export import CancelSubscription422Response = models.CancelSubscription422Response;
    export import CancelSubscription422ResponseCodeEnum = models.CancelSubscription422ResponseCodeEnum;
    export import CancelSubscriptionRequest = models.CancelSubscriptionRequest;
    export import CancelSubscriptionRequestModeEnum = models.CancelSubscriptionRequestModeEnum;
    export import CardBrandProcessingCurrenciesModel = models.CardBrandProcessingCurrenciesModel;
    export import CardDetails = models.CardDetails;
    export import ChannelDomainModel = models.ChannelDomainModel;
    export import ChannelDomainModelStatusEnum = models.ChannelDomainModelStatusEnum;
    export import ChannelDomainModelEnvironmentEnum = models.ChannelDomainModelEnvironmentEnum;
    export import ConflictErrorResponse = models.ConflictErrorResponse;
    export import ConflictErrorResponseCodeEnum = models.ConflictErrorResponseCodeEnum;
    export import ConnectorAccountAuthenticationSettingsModel = models.ConnectorAccountAuthenticationSettingsModel;
    export import ConnectorAccountAuthenticationSettingsModelProvidersEnum = models.ConnectorAccountAuthenticationSettingsModelProvidersEnum;
    export import ConnectorAccountDefaultRecurringStrategyModel = models.ConnectorAccountDefaultRecurringStrategyModel;
    export import ConnectorAccountDefaultRecurringStrategyModelProcessingMethodsEnum = models.ConnectorAccountDefaultRecurringStrategyModelProcessingMethodsEnum;
    export import ConnectorAccountDescriptorCardBrandPrefixModel = models.ConnectorAccountDescriptorCardBrandPrefixModel;
    export import ConnectorAccountDescriptorDomainModel = models.ConnectorAccountDescriptorDomainModel;
    export import ConnectorAccountDescriptorDomainModelStatusEnum = models.ConnectorAccountDescriptorDomainModelStatusEnum;
    export import ConnectorAccountDescriptorPrefixModel = models.ConnectorAccountDescriptorPrefixModel;
    export import ConnectorAccountDescriptorSettingsModel = models.ConnectorAccountDescriptorSettingsModel;
    export import ConnectorAccountDescriptorSettingsModelTypeEnum = models.ConnectorAccountDescriptorSettingsModelTypeEnum;
    export import ConnectorAccountDomainModel = models.ConnectorAccountDomainModel;
    export import ConnectorAccountDomainModelStatusEnum = models.ConnectorAccountDomainModelStatusEnum;
    export import ConnectorAccountDomainModelPaymentMethodsEnum = models.ConnectorAccountDomainModelPaymentMethodsEnum;
    export import ConnectorAccountDomainModelPaymentFeaturesEnum = models.ConnectorAccountDomainModelPaymentFeaturesEnum;
    export import ConnectorAccountDomainModelRequiredFieldsEnum = models.ConnectorAccountDomainModelRequiredFieldsEnum;
    export import CouponCodeDiscount = models.CouponCodeDiscount;
    export import CouponIdDiscount = models.CouponIdDiscount;
    export import CreateAntifraudListItemRequest = models.CreateAntifraudListItemRequest;
    export import CreateAntifraudListRequest = models.CreateAntifraudListRequest;
    export import CreateApiKey422Response = models.CreateApiKey422Response;
    export import CreateApiKey422ResponseCodeEnum = models.CreateApiKey422ResponseCodeEnum;
    export import CreateApiKeyRequest = models.CreateApiKeyRequest;
    export import CreateApiKeyResponse = models.CreateApiKeyResponse;
    export import CreateCustomerRequest = models.CreateCustomerRequest;
    export import CreateCustomerRequestTypeEnum = models.CreateCustomerRequestTypeEnum;
    export import CreateCustomerRequestAllOfConfiguration = models.CreateCustomerRequestAllOfConfiguration;
    export import CreateCustomerRequestAllOfTax = models.CreateCustomerRequestAllOfTax;
    export import CreateCustomerRequestAllOfTaxTaxabilityEnum = models.CreateCustomerRequestAllOfTaxTaxabilityEnum;
    export import CreateInvoice422Response = models.CreateInvoice422Response;
    export import CreateInvoice422ResponseCodeEnum = models.CreateInvoice422ResponseCodeEnum;
    export import CreateInvoiceRequest = models.CreateInvoiceRequest;
    export import CreateInvoiceRequestDiscountsInner = models.CreateInvoiceRequestDiscountsInner;
    export import CreateItemAntifraudList422Response = models.CreateItemAntifraudList422Response;
    export import CreateItemAntifraudList422ResponseCodeEnum = models.CreateItemAntifraudList422ResponseCodeEnum;
    export import CreateReportRequest = models.CreateReportRequest;
    export import CreateReportRequestReportTypeEnum = models.CreateReportRequestReportTypeEnum;
    export import CreateSubscription422Response = models.CreateSubscription422Response;
    export import CreateSubscription422ResponseCodeEnum = models.CreateSubscription422ResponseCodeEnum;
    export import CreateSubscriptionRequest = models.CreateSubscriptionRequest;
    export import CreateSubscriptionRequestLineItemsInner = models.CreateSubscriptionRequestLineItemsInner;
    export import CreateSubscriptionRequestTrial = models.CreateSubscriptionRequestTrial;
    export import CreateWebhook422Response = models.CreateWebhook422Response;
    export import CreateWebhook422ResponseCodeEnum = models.CreateWebhook422ResponseCodeEnum;
    export import CreateWebhookRequest = models.CreateWebhookRequest;
    export import CreateWebhookResponse = models.CreateWebhookResponse;
    export import CreateWebhookResponseStatusEnum = models.CreateWebhookResponseStatusEnum;
    export import CustomerAddress = models.CustomerAddress;
    export import CustomerAddressRequest = models.CustomerAddressRequest;
    export import CustomerCreatedEventModel = models.CustomerCreatedEventModel;
    export import CustomerCreatedEventModelEventTypeEnum = models.CustomerCreatedEventModelEventTypeEnum;
    export import CustomerCreatedEventModelData = models.CustomerCreatedEventModelData;
    export import CustomerDomainModel = models.CustomerDomainModel;
    export import CustomerDomainModelStatusEnum = models.CustomerDomainModelStatusEnum;
    export import CustomerDomainModelTypeEnum = models.CustomerDomainModelTypeEnum;
    export import CustomerDomainModelAllOfTax = models.CustomerDomainModelAllOfTax;
    export import CustomerDomainModelAllOfTaxTaxabilityEnum = models.CustomerDomainModelAllOfTaxTaxabilityEnum;
    export import CustomerModel = models.CustomerModel;
    export import CustomerModelTax = models.CustomerModelTax;
    export import CustomerModelTaxTaxabilityEnum = models.CustomerModelTaxTaxabilityEnum;
    export import CustomerUpdatedEventModel = models.CustomerUpdatedEventModel;
    export import CustomerUpdatedEventModelEventTypeEnum = models.CustomerUpdatedEventModelEventTypeEnum;
    export import CustomerUpdatedEventModelData = models.CustomerUpdatedEventModelData;
    export import DateTimeFilter = models.DateTimeFilter;
    export import DateTimeFilterRange = models.DateTimeFilterRange;
    export import DateTimeFilterRangeOperatorEnum = models.DateTimeFilterRangeOperatorEnum;
    export import DateTimeFilterRangeValue = models.DateTimeFilterRangeValue;
    export import DateTimeFilterSingleValue = models.DateTimeFilterSingleValue;
    export import DateTimeFilterSingleValueOperatorEnum = models.DateTimeFilterSingleValueOperatorEnum;
    export import DefaultFallbackPolicyModel = models.DefaultFallbackPolicyModel;
    export import DeleteAntifraudListItemRequest = models.DeleteAntifraudListItemRequest;
    export import DeleteInvoiceRequest = models.DeleteInvoiceRequest;
    export import DeleteSubscriptionCancellation422Response = models.DeleteSubscriptionCancellation422Response;
    export import DeleteSubscriptionCancellation422ResponseCodeEnum = models.DeleteSubscriptionCancellation422ResponseCodeEnum;
    export import DeleteSubscriptionCancellationRequest = models.DeleteSubscriptionCancellationRequest;
    export import DeleteSubscriptionPauseRequest = models.DeleteSubscriptionPauseRequest;
    export import DeleteWebhook422Response = models.DeleteWebhook422Response;
    export import DeleteWebhook422ResponseCodeEnum = models.DeleteWebhook422ResponseCodeEnum;
    export import DeleteWebhookRequest = models.DeleteWebhookRequest;
    export import DiscountDetailsModel = models.DiscountDetailsModel;
    export import DiscountDetailsModelCalculationTypeEnum = models.DiscountDetailsModelCalculationTypeEnum;
    export import DownloadReport422Response = models.DownloadReport422Response;
    export import DownloadReport422ResponseCodeEnum = models.DownloadReport422ResponseCodeEnum;
    export import DownloadReportRequest = models.DownloadReportRequest;
    export import EmailFilter = models.EmailFilter;
    export import EmailFilterEq = models.EmailFilterEq;
    export import EmailFilterEqOperatorEnum = models.EmailFilterEqOperatorEnum;
    export import EmailFilterStartsWith = models.EmailFilterStartsWith;
    export import EmailFilterStartsWithOperatorEnum = models.EmailFilterStartsWithOperatorEnum;
    export import EventEnvelope = models.EventEnvelope;
    export import FinalizeInvoice422Response = models.FinalizeInvoice422Response;
    export import FinalizeInvoice422ResponseCodeEnum = models.FinalizeInvoice422ResponseCodeEnum;
    export import FinalizeInvoiceRequest = models.FinalizeInvoiceRequest;
    export import FinancialInvoiceDomainModel = models.FinancialInvoiceDomainModel;
    export import FinancialInvoiceFileModel = models.FinancialInvoiceFileModel;
    export import FinancialInvoiceFileModelTypeEnum = models.FinancialInvoiceFileModelTypeEnum;
    export import FinancialInvoiceFileModelStatusEnum = models.FinancialInvoiceFileModelStatusEnum;
    export import FraudAlertDomainModel = models.FraudAlertDomainModel;
    export import FraudAlertReceivedEventModel = models.FraudAlertReceivedEventModel;
    export import FraudAlertReceivedEventModelEventTypeEnum = models.FraudAlertReceivedEventModelEventTypeEnum;
    export import FraudAlertReceivedEventModelData = models.FraudAlertReceivedEventModelData;
    export import Free = models.Free;
    export import FreeTypeEnum = models.FreeTypeEnum;
    export import GetAntifraudListRequest = models.GetAntifraudListRequest;
    export import GetApiKeyRequest = models.GetApiKeyRequest;
    export import GetConnectorAccountRequest = models.GetConnectorAccountRequest;
    export import GetCustomerRequest = models.GetCustomerRequest;
    export import GetFinancialInvoiceRequest = models.GetFinancialInvoiceRequest;
    export import GetFinancialInvoiceResponse = models.GetFinancialInvoiceResponse;
    export import GetInvoiceRequest = models.GetInvoiceRequest;
    export import GetLegalEntityRequest = models.GetLegalEntityRequest;
    export import GetMonthlyStatementRequest = models.GetMonthlyStatementRequest;
    export import GetMonthlyStatementResponse = models.GetMonthlyStatementResponse;
    export import GetPaymentInstrumentRequest = models.GetPaymentInstrumentRequest;
    export import GetReportRequest = models.GetReportRequest;
    export import GetRoutingConfigRequest = models.GetRoutingConfigRequest;
    export import GetRoutingConfigVersionRequest = models.GetRoutingConfigVersionRequest;
    export import GetSettlementRequest = models.GetSettlementRequest;
    export import GetSettlementResponse = models.GetSettlementResponse;
    export import GetSubscriptionRequest = models.GetSubscriptionRequest;
    export import GetWebhookRequest = models.GetWebhookRequest;
    export import Infinite = models.Infinite;
    export import InfiniteModeEnum = models.InfiniteModeEnum;
    export import IntervalModel = models.IntervalModel;
    export import InvoiceAmountDetailsModel = models.InvoiceAmountDetailsModel;
    export import InvoiceCreatedEventModel = models.InvoiceCreatedEventModel;
    export import InvoiceCreatedEventModelEventTypeEnum = models.InvoiceCreatedEventModelEventTypeEnum;
    export import InvoiceCreatedEventModelData = models.InvoiceCreatedEventModelData;
    export import InvoiceDeletedEventModel = models.InvoiceDeletedEventModel;
    export import InvoiceDeletedEventModelEventTypeEnum = models.InvoiceDeletedEventModelEventTypeEnum;
    export import InvoiceDeletedEventModelData = models.InvoiceDeletedEventModelData;
    export import InvoiceDomainModel = models.InvoiceDomainModel;
    export import InvoiceDomainModelStatusEnum = models.InvoiceDomainModelStatusEnum;
    export import InvoiceDomainModelBillingReasonEnum = models.InvoiceDomainModelBillingReasonEnum;
    export import InvoiceDunningStartedEventModel = models.InvoiceDunningStartedEventModel;
    export import InvoiceDunningStartedEventModelEventTypeEnum = models.InvoiceDunningStartedEventModelEventTypeEnum;
    export import InvoiceDunningStartedEventModelData = models.InvoiceDunningStartedEventModelData;
    export import InvoiceFinalizationFailedEventModel = models.InvoiceFinalizationFailedEventModel;
    export import InvoiceFinalizationFailedEventModelEventTypeEnum = models.InvoiceFinalizationFailedEventModelEventTypeEnum;
    export import InvoiceFinalizationFailedEventModelData = models.InvoiceFinalizationFailedEventModelData;
    export import InvoiceFinalizedEventModel = models.InvoiceFinalizedEventModel;
    export import InvoiceFinalizedEventModelEventTypeEnum = models.InvoiceFinalizedEventModelEventTypeEnum;
    export import InvoiceFinalizedEventModelData = models.InvoiceFinalizedEventModelData;
    export import InvoicePaidEventModel = models.InvoicePaidEventModel;
    export import InvoicePaidEventModelEventTypeEnum = models.InvoicePaidEventModelEventTypeEnum;
    export import InvoicePaidEventModelData = models.InvoicePaidEventModelData;
    export import InvoicePaymentDomainModel = models.InvoicePaymentDomainModel;
    export import InvoicePaymentDomainModelStatusEnum = models.InvoicePaymentDomainModelStatusEnum;
    export import InvoicePaymentFailedEventModel = models.InvoicePaymentFailedEventModel;
    export import InvoicePaymentFailedEventModelEventTypeEnum = models.InvoicePaymentFailedEventModelEventTypeEnum;
    export import InvoicePaymentFailedEventModelData = models.InvoicePaymentFailedEventModelData;
    export import InvoiceUnpaidEventModel = models.InvoiceUnpaidEventModel;
    export import InvoiceUnpaidEventModelEventTypeEnum = models.InvoiceUnpaidEventModelEventTypeEnum;
    export import InvoiceUnpaidEventModelData = models.InvoiceUnpaidEventModelData;
    export import InvoiceUpdatedEventModel = models.InvoiceUpdatedEventModel;
    export import InvoiceUpdatedEventModelEventTypeEnum = models.InvoiceUpdatedEventModelEventTypeEnum;
    export import InvoiceUpdatedEventModelData = models.InvoiceUpdatedEventModelData;
    export import InvoiceVoidedEventModel = models.InvoiceVoidedEventModel;
    export import InvoiceVoidedEventModelEventTypeEnum = models.InvoiceVoidedEventModelEventTypeEnum;
    export import InvoiceVoidedEventModelData = models.InvoiceVoidedEventModelData;
    export import LegalEntityDomainModel = models.LegalEntityDomainModel;
    export import LineItemAmountDetailsModel = models.LineItemAmountDetailsModel;
    export import LineItemModel = models.LineItemModel;
    export import LineItemModelTax = models.LineItemModelTax;
    export import LineItemModelTaxModeEnum = models.LineItemModelTaxModeEnum;
    export import LineItemProductPrice = models.LineItemProductPrice;
    export import LineItemRequest = models.LineItemRequest;
    export import ListAntifraudListItemsRequest = models.ListAntifraudListItemsRequest;
    export import ListAntifraudListItemsRequestAllOfFilters = models.ListAntifraudListItemsRequestAllOfFilters;
    export import ListAntifraudListItemsRequestAllOfFiltersCreatedBy = models.ListAntifraudListItemsRequestAllOfFiltersCreatedBy;
    export import ListAntifraudListItemsRequestAllOfFiltersCreatedByOperatorEnum = models.ListAntifraudListItemsRequestAllOfFiltersCreatedByOperatorEnum;
    export import ListAntifraudListItemsRequestAllOfFiltersFieldValue = models.ListAntifraudListItemsRequestAllOfFiltersFieldValue;
    export import ListAntifraudListItemsRequestAllOfFiltersFieldValueOperatorEnum = models.ListAntifraudListItemsRequestAllOfFiltersFieldValueOperatorEnum;
    export import ListAntifraudListItemsResponse = models.ListAntifraudListItemsResponse;
    export import ListAntifraudListsRequest = models.ListAntifraudListsRequest;
    export import ListAntifraudListsRequestAllOfFilters = models.ListAntifraudListsRequestAllOfFilters;
    export import ListAntifraudListsRequestAllOfFiltersField = models.ListAntifraudListsRequestAllOfFiltersField;
    export import ListAntifraudListsRequestAllOfFiltersFieldOperatorEnum = models.ListAntifraudListsRequestAllOfFiltersFieldOperatorEnum;
    export import ListAntifraudListsResponse = models.ListAntifraudListsResponse;
    export import ListApiKeyRequest = models.ListApiKeyRequest;
    export import ListApiKeyResponse = models.ListApiKeyResponse;
    export import ListChannelRequest = models.ListChannelRequest;
    export import ListChannelResponse = models.ListChannelResponse;
    export import ListConnectorAccountDescriptorsRequest = models.ListConnectorAccountDescriptorsRequest;
    export import ListConnectorAccountDescriptorsRequestAllOfFilters = models.ListConnectorAccountDescriptorsRequestAllOfFilters;
    export import ListConnectorAccountDescriptorsRequestAllOfFiltersStatus = models.ListConnectorAccountDescriptorsRequestAllOfFiltersStatus;
    export import ListConnectorAccountDescriptorsRequestAllOfFiltersStatusOperatorEnum = models.ListConnectorAccountDescriptorsRequestAllOfFiltersStatusOperatorEnum;
    export import ListConnectorAccountDescriptorsResponse = models.ListConnectorAccountDescriptorsResponse;
    export import ListConnectorAccountsRequest = models.ListConnectorAccountsRequest;
    export import ListConnectorAccountsRequestAllOfFilters = models.ListConnectorAccountsRequestAllOfFilters;
    export import ListConnectorAccountsRequestAllOfFiltersConnectorId = models.ListConnectorAccountsRequestAllOfFiltersConnectorId;
    export import ListConnectorAccountsRequestAllOfFiltersConnectorIdOperatorEnum = models.ListConnectorAccountsRequestAllOfFiltersConnectorIdOperatorEnum;
    export import ListConnectorAccountsRequestAllOfFiltersName = models.ListConnectorAccountsRequestAllOfFiltersName;
    export import ListConnectorAccountsRequestAllOfFiltersNameOperatorEnum = models.ListConnectorAccountsRequestAllOfFiltersNameOperatorEnum;
    export import ListConnectorAccountsRequestAllOfFiltersStatus = models.ListConnectorAccountsRequestAllOfFiltersStatus;
    export import ListConnectorAccountsRequestAllOfFiltersStatusOperatorEnum = models.ListConnectorAccountsRequestAllOfFiltersStatusOperatorEnum;
    export import ListConnectorAccountsResponse = models.ListConnectorAccountsResponse;
    export import ListCustomersRequest = models.ListCustomersRequest;
    export import ListCustomersRequestAllOfFilters = models.ListCustomersRequestAllOfFilters;
    export import ListCustomersRequestAllOfFiltersEmail = models.ListCustomersRequestAllOfFiltersEmail;
    export import ListCustomersRequestAllOfFiltersEmailOperatorEnum = models.ListCustomersRequestAllOfFiltersEmailOperatorEnum;
    export import ListCustomersRequestAllOfFiltersMerchantReference = models.ListCustomersRequestAllOfFiltersMerchantReference;
    export import ListCustomersRequestAllOfFiltersMerchantReferenceOperatorEnum = models.ListCustomersRequestAllOfFiltersMerchantReferenceOperatorEnum;
    export import ListCustomersRequestAllOfFiltersStatus = models.ListCustomersRequestAllOfFiltersStatus;
    export import ListCustomersRequestAllOfFiltersStatusOperatorEnum = models.ListCustomersRequestAllOfFiltersStatusOperatorEnum;
    export import ListCustomersRequestAllOfFiltersStatusValueEnum = models.ListCustomersRequestAllOfFiltersStatusValueEnum;
    export import ListCustomersRequestAllOfFiltersType = models.ListCustomersRequestAllOfFiltersType;
    export import ListCustomersRequestAllOfFiltersTypeOperatorEnum = models.ListCustomersRequestAllOfFiltersTypeOperatorEnum;
    export import ListCustomersRequestAllOfFiltersTypeValueEnum = models.ListCustomersRequestAllOfFiltersTypeValueEnum;
    export import ListCustomersResponse = models.ListCustomersResponse;
    export import ListFinancialInvoicesRequest = models.ListFinancialInvoicesRequest;
    export import ListFinancialInvoicesRequestAllOfFilters = models.ListFinancialInvoicesRequestAllOfFilters;
    export import ListFinancialInvoicesRequestAllOfFiltersCurrency = models.ListFinancialInvoicesRequestAllOfFiltersCurrency;
    export import ListFinancialInvoicesRequestAllOfFiltersCurrencyOperatorEnum = models.ListFinancialInvoicesRequestAllOfFiltersCurrencyOperatorEnum;
    export import ListFinancialInvoicesRequestAllOfFiltersLegalEntityId = models.ListFinancialInvoicesRequestAllOfFiltersLegalEntityId;
    export import ListFinancialInvoicesRequestAllOfFiltersLegalEntityIdOperatorEnum = models.ListFinancialInvoicesRequestAllOfFiltersLegalEntityIdOperatorEnum;
    export import ListFinancialInvoicesRequestAllOfFiltersPeriod = models.ListFinancialInvoicesRequestAllOfFiltersPeriod;
    export import ListFinancialInvoicesRequestAllOfFiltersPeriodOperatorEnum = models.ListFinancialInvoicesRequestAllOfFiltersPeriodOperatorEnum;
    export import ListFinancialInvoicesRequestAllOfFiltersUploadedAt = models.ListFinancialInvoicesRequestAllOfFiltersUploadedAt;
    export import ListFinancialInvoicesRequestAllOfFiltersUploadedAtOperatorEnum = models.ListFinancialInvoicesRequestAllOfFiltersUploadedAtOperatorEnum;
    export import ListFinancialInvoicesResponse = models.ListFinancialInvoicesResponse;
    export import ListInvoicesRequest = models.ListInvoicesRequest;
    export import ListInvoicesRequestAllOfFilters = models.ListInvoicesRequestAllOfFilters;
    export import ListInvoicesRequestAllOfFiltersCustomerId = models.ListInvoicesRequestAllOfFiltersCustomerId;
    export import ListInvoicesRequestAllOfFiltersCustomerIdOperatorEnum = models.ListInvoicesRequestAllOfFiltersCustomerIdOperatorEnum;
    export import ListInvoicesRequestAllOfFiltersStatus = models.ListInvoicesRequestAllOfFiltersStatus;
    export import ListInvoicesRequestAllOfFiltersStatusOperatorEnum = models.ListInvoicesRequestAllOfFiltersStatusOperatorEnum;
    export import ListInvoicesRequestAllOfFiltersSubscriptionId = models.ListInvoicesRequestAllOfFiltersSubscriptionId;
    export import ListInvoicesRequestAllOfFiltersSubscriptionIdOperatorEnum = models.ListInvoicesRequestAllOfFiltersSubscriptionIdOperatorEnum;
    export import ListInvoicesResponse = models.ListInvoicesResponse;
    export import ListLegalEntityRequest = models.ListLegalEntityRequest;
    export import ListLegalEntityResponse = models.ListLegalEntityResponse;
    export import ListMonthlyStatementsRequest = models.ListMonthlyStatementsRequest;
    export import ListMonthlyStatementsRequestAllOfFilters = models.ListMonthlyStatementsRequestAllOfFilters;
    export import ListMonthlyStatementsRequestAllOfFiltersCurrency = models.ListMonthlyStatementsRequestAllOfFiltersCurrency;
    export import ListMonthlyStatementsRequestAllOfFiltersCurrencyOperatorEnum = models.ListMonthlyStatementsRequestAllOfFiltersCurrencyOperatorEnum;
    export import ListMonthlyStatementsRequestAllOfFiltersLegalEntityId = models.ListMonthlyStatementsRequestAllOfFiltersLegalEntityId;
    export import ListMonthlyStatementsRequestAllOfFiltersLegalEntityIdOperatorEnum = models.ListMonthlyStatementsRequestAllOfFiltersLegalEntityIdOperatorEnum;
    export import ListMonthlyStatementsRequestAllOfFiltersPeriod = models.ListMonthlyStatementsRequestAllOfFiltersPeriod;
    export import ListMonthlyStatementsRequestAllOfFiltersPeriodOperatorEnum = models.ListMonthlyStatementsRequestAllOfFiltersPeriodOperatorEnum;
    export import ListMonthlyStatementsRequestAllOfFiltersUploadedAt = models.ListMonthlyStatementsRequestAllOfFiltersUploadedAt;
    export import ListMonthlyStatementsRequestAllOfFiltersUploadedAtOperatorEnum = models.ListMonthlyStatementsRequestAllOfFiltersUploadedAtOperatorEnum;
    export import ListMonthlyStatementsResponse = models.ListMonthlyStatementsResponse;
    export import ListPaymentInstrumentsRequest = models.ListPaymentInstrumentsRequest;
    export import ListPaymentInstrumentsRequestAllOfFilters = models.ListPaymentInstrumentsRequestAllOfFilters;
    export import ListPaymentInstrumentsRequestAllOfFiltersStatus = models.ListPaymentInstrumentsRequestAllOfFiltersStatus;
    export import ListPaymentInstrumentsRequestAllOfFiltersStatusOperatorEnum = models.ListPaymentInstrumentsRequestAllOfFiltersStatusOperatorEnum;
    export import ListPaymentInstrumentsRequestAllOfFiltersStatusValueEnum = models.ListPaymentInstrumentsRequestAllOfFiltersStatusValueEnum;
    export import ListPaymentInstrumentsResponse = models.ListPaymentInstrumentsResponse;
    export import ListReportsRequest = models.ListReportsRequest;
    export import ListReportsRequestReportTypeEnum = models.ListReportsRequestReportTypeEnum;
    export import ListReportsResponse = models.ListReportsResponse;
    export import ListRoutingConfigsRequest = models.ListRoutingConfigsRequest;
    export import ListRoutingConfigsRequestAllOfFilters = models.ListRoutingConfigsRequestAllOfFilters;
    export import ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroup = models.ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroup;
    export import ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroupOperatorEnum = models.ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroupOperatorEnum;
    export import ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroupValueEnum = models.ListRoutingConfigsRequestAllOfFiltersPaymentMethodGroupValueEnum;
    export import ListRoutingConfigsResponse = models.ListRoutingConfigsResponse;
    export import ListSettlementsRequest = models.ListSettlementsRequest;
    export import ListSettlementsRequestAllOfFilters = models.ListSettlementsRequestAllOfFilters;
    export import ListSettlementsRequestAllOfFiltersCurrency = models.ListSettlementsRequestAllOfFiltersCurrency;
    export import ListSettlementsRequestAllOfFiltersCurrencyOperatorEnum = models.ListSettlementsRequestAllOfFiltersCurrencyOperatorEnum;
    export import ListSettlementsRequestAllOfFiltersLegalEntityId = models.ListSettlementsRequestAllOfFiltersLegalEntityId;
    export import ListSettlementsRequestAllOfFiltersLegalEntityIdOperatorEnum = models.ListSettlementsRequestAllOfFiltersLegalEntityIdOperatorEnum;
    export import ListSettlementsRequestAllOfFiltersPeriod = models.ListSettlementsRequestAllOfFiltersPeriod;
    export import ListSettlementsRequestAllOfFiltersPeriodOperatorEnum = models.ListSettlementsRequestAllOfFiltersPeriodOperatorEnum;
    export import ListSettlementsRequestAllOfFiltersSettlementDate = models.ListSettlementsRequestAllOfFiltersSettlementDate;
    export import ListSettlementsRequestAllOfFiltersSettlementDateOperatorEnum = models.ListSettlementsRequestAllOfFiltersSettlementDateOperatorEnum;
    export import ListSettlementsResponse = models.ListSettlementsResponse;
    export import ListSubscriptionsRequest = models.ListSubscriptionsRequest;
    export import ListSubscriptionsRequestAllOfFilters = models.ListSubscriptionsRequestAllOfFilters;
    export import ListSubscriptionsRequestAllOfFiltersCreatedAt = models.ListSubscriptionsRequestAllOfFiltersCreatedAt;
    export import ListSubscriptionsRequestAllOfFiltersCreatedAtOperatorEnum = models.ListSubscriptionsRequestAllOfFiltersCreatedAtOperatorEnum;
    export import ListSubscriptionsRequestAllOfFiltersCustomerId = models.ListSubscriptionsRequestAllOfFiltersCustomerId;
    export import ListSubscriptionsRequestAllOfFiltersCustomerIdOperatorEnum = models.ListSubscriptionsRequestAllOfFiltersCustomerIdOperatorEnum;
    export import ListSubscriptionsResponse = models.ListSubscriptionsResponse;
    export import ListWebhookRequest = models.ListWebhookRequest;
    export import ListWebhookResponse = models.ListWebhookResponse;
    export import Manual = models.Manual;
    export import ManualModeEnum = models.ManualModeEnum;
    export import ManualStatusEnum = models.ManualStatusEnum;
    export import ModelConfiguration = models.ModelConfiguration;
    export import MonthlyStatementDomainModel = models.MonthlyStatementDomainModel;
    export import MonthlyStatementFileModel = models.MonthlyStatementFileModel;
    export import MonthlyStatementFileModelTypeEnum = models.MonthlyStatementFileModelTypeEnum;
    export import MonthlyStatementFileModelStatusEnum = models.MonthlyStatementFileModelStatusEnum;
    export import NotFoundErrorResponse = models.NotFoundErrorResponse;
    export import NotFoundErrorResponseCodeEnum = models.NotFoundErrorResponseCodeEnum;
    export import Now = models.Now;
    export import NowModeEnum = models.NowModeEnum;
    export import Now1 = models.Now1;
    export import Now1ModeEnum = models.Now1ModeEnum;
    export import PaginationInfo = models.PaginationInfo;
    export import PaginationInfoPagination = models.PaginationInfoPagination;
    export import Paid = models.Paid;
    export import PaidTypeEnum = models.PaidTypeEnum;
    export import PauseSubscription422Response = models.PauseSubscription422Response;
    export import PauseSubscription422ResponseCodeEnum = models.PauseSubscription422ResponseCodeEnum;
    export import PauseSubscriptionRequest = models.PauseSubscriptionRequest;
    export import PauseSubscriptionRequestStartPoint = models.PauseSubscriptionRequestStartPoint;
    export import PauseSubscriptionRequestStopPoint = models.PauseSubscriptionRequestStopPoint;
    export import PayInvoice422Response = models.PayInvoice422Response;
    export import PayInvoice422ResponseCodeEnum = models.PayInvoice422ResponseCodeEnum;
    export import PayInvoiceRequest = models.PayInvoiceRequest;
    export import PaymentInstrumentCreatedEventModel = models.PaymentInstrumentCreatedEventModel;
    export import PaymentInstrumentCreatedEventModelEventTypeEnum = models.PaymentInstrumentCreatedEventModelEventTypeEnum;
    export import PaymentInstrumentCreatedEventModelData = models.PaymentInstrumentCreatedEventModelData;
    export import PaymentInstrumentDomainModel = models.PaymentInstrumentDomainModel;
    export import PaymentInstrumentDomainModelStatusEnum = models.PaymentInstrumentDomainModelStatusEnum;
    export import PaymentInstrumentDomainModelRevocationReasonEnum = models.PaymentInstrumentDomainModelRevocationReasonEnum;
    export import PaymentInstrumentExpiredEventModel = models.PaymentInstrumentExpiredEventModel;
    export import PaymentInstrumentExpiredEventModelEventTypeEnum = models.PaymentInstrumentExpiredEventModelEventTypeEnum;
    export import PaymentInstrumentExpiredEventModelData = models.PaymentInstrumentExpiredEventModelData;
    export import PaymentInstrumentRevokedEventModel = models.PaymentInstrumentRevokedEventModel;
    export import PaymentInstrumentRevokedEventModelEventTypeEnum = models.PaymentInstrumentRevokedEventModelEventTypeEnum;
    export import PaymentInstrumentRevokedEventModelData = models.PaymentInstrumentRevokedEventModelData;
    export import PaypalDetails = models.PaypalDetails;
    export import PeriodConfigModel = models.PeriodConfigModel;
    export import PeriodConfigModelUnitEnum = models.PeriodConfigModelUnitEnum;
    export import PreventionAlertDomainModel = models.PreventionAlertDomainModel;
    export import PreventionAlertDomainModelProviderEnum = models.PreventionAlertDomainModelProviderEnum;
    export import PreventionAlertDomainModelAlertTypeEnum = models.PreventionAlertDomainModelAlertTypeEnum;
    export import PreventionAlertDomainModelOutcomeEnum = models.PreventionAlertDomainModelOutcomeEnum;
    export import PreventionAlertReceivedEventModel = models.PreventionAlertReceivedEventModel;
    export import PreventionAlertReceivedEventModelEventTypeEnum = models.PreventionAlertReceivedEventModelEventTypeEnum;
    export import PreventionAlertReceivedEventModelData = models.PreventionAlertReceivedEventModelData;
    export import ProcessingCurrenciesModel = models.ProcessingCurrenciesModel;
    export import ReportDomainModel = models.ReportDomainModel;
    export import ReportDomainModelReportTypeEnum = models.ReportDomainModelReportTypeEnum;
    export import ReportDomainModelStatusEnum = models.ReportDomainModelStatusEnum;
    export import ReportDomainModelParameters = models.ReportDomainModelParameters;
    export import ReportGeneratedEventModel = models.ReportGeneratedEventModel;
    export import ReportGeneratedEventModelEventTypeEnum = models.ReportGeneratedEventModelEventTypeEnum;
    export import ReportGeneratedEventModelData = models.ReportGeneratedEventModelData;
    export import RevokePaymentInstrument422Response = models.RevokePaymentInstrument422Response;
    export import RevokePaymentInstrument422ResponseCodeEnum = models.RevokePaymentInstrument422ResponseCodeEnum;
    export import RevokePaymentInstrumentRequest = models.RevokePaymentInstrumentRequest;
    export import RotateApiKey422Response = models.RotateApiKey422Response;
    export import RotateApiKey422ResponseCodeEnum = models.RotateApiKey422ResponseCodeEnum;
    export import RotateApiKeyRequest = models.RotateApiKeyRequest;
    export import RotateApiKeyResponse = models.RotateApiKeyResponse;
    export import RotateWebhookKey422Response = models.RotateWebhookKey422Response;
    export import RotateWebhookKey422ResponseCodeEnum = models.RotateWebhookKey422ResponseCodeEnum;
    export import RotateWebhookKeyRequest = models.RotateWebhookKeyRequest;
    export import RotateWebhookKeyResponse = models.RotateWebhookKeyResponse;
    export import RotateWebhookKeyResponseStatusEnum = models.RotateWebhookKeyResponseStatusEnum;
    export import RouteModel = models.RouteModel;
    export import RouteRuleComplexConditionModelLevel1 = models.RouteRuleComplexConditionModelLevel1;
    export import RouteRuleComplexConditionModelLevel1TypeEnum = models.RouteRuleComplexConditionModelLevel1TypeEnum;
    export import RouteRuleComplexConditionModelLevel1BooleanOperatorEnum = models.RouteRuleComplexConditionModelLevel1BooleanOperatorEnum;
    export import RouteRuleComplexConditionModelLevel1ConditionsInner = models.RouteRuleComplexConditionModelLevel1ConditionsInner;
    export import RouteRuleComplexConditionModelLevel2 = models.RouteRuleComplexConditionModelLevel2;
    export import RouteRuleComplexConditionModelLevel2TypeEnum = models.RouteRuleComplexConditionModelLevel2TypeEnum;
    export import RouteRuleComplexConditionModelLevel2BooleanOperatorEnum = models.RouteRuleComplexConditionModelLevel2BooleanOperatorEnum;
    export import RouteRuleComplexConditionModelLevel2ConditionsInner = models.RouteRuleComplexConditionModelLevel2ConditionsInner;
    export import RouteRuleComplexConditionModelLevel3 = models.RouteRuleComplexConditionModelLevel3;
    export import RouteRuleComplexConditionModelLevel3TypeEnum = models.RouteRuleComplexConditionModelLevel3TypeEnum;
    export import RouteRuleComplexConditionModelLevel3BooleanOperatorEnum = models.RouteRuleComplexConditionModelLevel3BooleanOperatorEnum;
    export import RouteRuleConditionModel = models.RouteRuleConditionModel;
    export import RouteRuleConstantBoolValueModel = models.RouteRuleConstantBoolValueModel;
    export import RouteRuleConstantBoolValueModelSourceEnum = models.RouteRuleConstantBoolValueModelSourceEnum;
    export import RouteRuleConstantBoolValueModelValueTypeEnum = models.RouteRuleConstantBoolValueModelValueTypeEnum;
    export import RouteRuleConstantDoubleValueModel = models.RouteRuleConstantDoubleValueModel;
    export import RouteRuleConstantDoubleValueModelSourceEnum = models.RouteRuleConstantDoubleValueModelSourceEnum;
    export import RouteRuleConstantDoubleValueModelValueTypeEnum = models.RouteRuleConstantDoubleValueModelValueTypeEnum;
    export import RouteRuleConstantIntValueModel = models.RouteRuleConstantIntValueModel;
    export import RouteRuleConstantIntValueModelSourceEnum = models.RouteRuleConstantIntValueModelSourceEnum;
    export import RouteRuleConstantIntValueModelValueTypeEnum = models.RouteRuleConstantIntValueModelValueTypeEnum;
    export import RouteRuleConstantListOfDoublesValueModel = models.RouteRuleConstantListOfDoublesValueModel;
    export import RouteRuleConstantListOfDoublesValueModelSourceEnum = models.RouteRuleConstantListOfDoublesValueModelSourceEnum;
    export import RouteRuleConstantListOfDoublesValueModelValueTypeEnum = models.RouteRuleConstantListOfDoublesValueModelValueTypeEnum;
    export import RouteRuleConstantListOfIntsValueModel = models.RouteRuleConstantListOfIntsValueModel;
    export import RouteRuleConstantListOfIntsValueModelSourceEnum = models.RouteRuleConstantListOfIntsValueModelSourceEnum;
    export import RouteRuleConstantListOfIntsValueModelValueTypeEnum = models.RouteRuleConstantListOfIntsValueModelValueTypeEnum;
    export import RouteRuleConstantListOfStringsValueModel = models.RouteRuleConstantListOfStringsValueModel;
    export import RouteRuleConstantListOfStringsValueModelSourceEnum = models.RouteRuleConstantListOfStringsValueModelSourceEnum;
    export import RouteRuleConstantListOfStringsValueModelValueTypeEnum = models.RouteRuleConstantListOfStringsValueModelValueTypeEnum;
    export import RouteRuleConstantStringValueModel = models.RouteRuleConstantStringValueModel;
    export import RouteRuleConstantStringValueModelSourceEnum = models.RouteRuleConstantStringValueModelSourceEnum;
    export import RouteRuleConstantStringValueModelValueTypeEnum = models.RouteRuleConstantStringValueModelValueTypeEnum;
    export import RouteRuleConstantValueModel = models.RouteRuleConstantValueModel;
    export import RouteRuleLeftOperandModel = models.RouteRuleLeftOperandModel;
    export import RouteRuleMetadataValueModel = models.RouteRuleMetadataValueModel;
    export import RouteRuleMetadataValueModelSourceEnum = models.RouteRuleMetadataValueModelSourceEnum;
    export import RouteRuleMetadataValueModelValueTypeEnum = models.RouteRuleMetadataValueModelValueTypeEnum;
    export import RouteRuleModel = models.RouteRuleModel;
    export import RouteRulePropertyValueModel = models.RouteRulePropertyValueModel;
    export import RouteRulePropertyValueModelSourceEnum = models.RouteRulePropertyValueModelSourceEnum;
    export import RouteRulePropertyValueModelPropertyNameEnum = models.RouteRulePropertyValueModelPropertyNameEnum;
    export import RouteRuleSimpleConditionModel = models.RouteRuleSimpleConditionModel;
    export import RouteRuleSimpleConditionModelTypeEnum = models.RouteRuleSimpleConditionModelTypeEnum;
    export import RouteRuleSimpleConditionModelComparisonOperatorEnum = models.RouteRuleSimpleConditionModelComparisonOperatorEnum;
    export import RouteSetModel = models.RouteSetModel;
    export import RouteSetModelPreconditionTypeEnum = models.RouteSetModelPreconditionTypeEnum;
    export import RoutingConfigDomainModel = models.RoutingConfigDomainModel;
    export import RoutingConfigDomainModelPaymentMethodGroupEnum = models.RoutingConfigDomainModelPaymentMethodGroupEnum;
    export import RoutingConfigVersionDomainModel = models.RoutingConfigVersionDomainModel;
    export import RoutingConfigVersionDomainModelStatusEnum = models.RoutingConfigVersionDomainModelStatusEnum;
    export import RoutingConfigVersionPublishedEventModel = models.RoutingConfigVersionPublishedEventModel;
    export import RoutingConfigVersionPublishedEventModelEventTypeEnum = models.RoutingConfigVersionPublishedEventModelEventTypeEnum;
    export import RoutingConfigVersionPublishedEventModelData = models.RoutingConfigVersionPublishedEventModelData;
    export import SearchInvoicesRequest = models.SearchInvoicesRequest;
    export import SearchInvoicesRequestAllOfFilters = models.SearchInvoicesRequestAllOfFilters;
    export import SearchInvoicesRequestAllOfFiltersStatus = models.SearchInvoicesRequestAllOfFiltersStatus;
    export import SearchInvoicesRequestAllOfFiltersStatusOperatorEnum = models.SearchInvoicesRequestAllOfFiltersStatusOperatorEnum;
    export import SearchInvoicesResponse = models.SearchInvoicesResponse;
    export import SearchSubscriptionsRequest = models.SearchSubscriptionsRequest;
    export import SearchSubscriptionsRequestAllOfFilters = models.SearchSubscriptionsRequestAllOfFilters;
    export import SearchSubscriptionsRequestAllOfFiltersCustomerId = models.SearchSubscriptionsRequestAllOfFiltersCustomerId;
    export import SearchSubscriptionsRequestAllOfFiltersCustomerIdOperatorEnum = models.SearchSubscriptionsRequestAllOfFiltersCustomerIdOperatorEnum;
    export import SearchSubscriptionsRequestAllOfFiltersProductId = models.SearchSubscriptionsRequestAllOfFiltersProductId;
    export import SearchSubscriptionsRequestAllOfFiltersProductIdOperatorEnum = models.SearchSubscriptionsRequestAllOfFiltersProductIdOperatorEnum;
    export import SearchSubscriptionsRequestAllOfFiltersProductPriceId = models.SearchSubscriptionsRequestAllOfFiltersProductPriceId;
    export import SearchSubscriptionsRequestAllOfFiltersProductPriceIdOperatorEnum = models.SearchSubscriptionsRequestAllOfFiltersProductPriceIdOperatorEnum;
    export import SearchSubscriptionsRequestAllOfFiltersStatus = models.SearchSubscriptionsRequestAllOfFiltersStatus;
    export import SearchSubscriptionsRequestAllOfFiltersStatusOperatorEnum = models.SearchSubscriptionsRequestAllOfFiltersStatusOperatorEnum;
    export import SearchSubscriptionsResponse = models.SearchSubscriptionsResponse;
    export import SegmentModel = models.SegmentModel;
    export import SettlementDomainModel = models.SettlementDomainModel;
    export import SettlementFileModel = models.SettlementFileModel;
    export import SettlementFileModelTypeEnum = models.SettlementFileModelTypeEnum;
    export import SettlementFileModelStatusEnum = models.SettlementFileModelStatusEnum;
    export import SpecificDate = models.SpecificDate;
    export import SpecificDateModeEnum = models.SpecificDateModeEnum;
    export import SpecificDate1 = models.SpecificDate1;
    export import SpecificDate1ModeEnum = models.SpecificDate1ModeEnum;
    export import SpecificDate2 = models.SpecificDate2;
    export import SpecificDate2ModeEnum = models.SpecificDate2ModeEnum;
    export import StateErrorResponse = models.StateErrorResponse;
    export import StepModel = models.StepModel;
    export import StepModelStatusEnum = models.StepModelStatusEnum;
    export import StepModelProcessingMethodEnum = models.StepModelProcessingMethodEnum;
    export import SubscriptionActivatedEventModel = models.SubscriptionActivatedEventModel;
    export import SubscriptionActivatedEventModelEventTypeEnum = models.SubscriptionActivatedEventModelEventTypeEnum;
    export import SubscriptionActivatedEventModelData = models.SubscriptionActivatedEventModelData;
    export import SubscriptionCancelledEventModel = models.SubscriptionCancelledEventModel;
    export import SubscriptionCancelledEventModelEventTypeEnum = models.SubscriptionCancelledEventModelEventTypeEnum;
    export import SubscriptionCancelledEventModelData = models.SubscriptionCancelledEventModelData;
    export import SubscriptionCreatedEventModel = models.SubscriptionCreatedEventModel;
    export import SubscriptionCreatedEventModelEventTypeEnum = models.SubscriptionCreatedEventModelEventTypeEnum;
    export import SubscriptionCreatedEventModelData = models.SubscriptionCreatedEventModelData;
    export import SubscriptionDomainModel = models.SubscriptionDomainModel;
    export import SubscriptionDomainModelStatusEnum = models.SubscriptionDomainModelStatusEnum;
    export import SubscriptionDomainModelCancellationInfo = models.SubscriptionDomainModelCancellationInfo;
    export import SubscriptionDomainModelCancellationInfoReasonEnum = models.SubscriptionDomainModelCancellationInfoReasonEnum;
    export import SubscriptionDomainModelPauseInfo = models.SubscriptionDomainModelPauseInfo;
    export import SubscriptionDomainModelTrialInfo = models.SubscriptionDomainModelTrialInfo;
    export import SubscriptionDomainModelTrialInfoTypeEnum = models.SubscriptionDomainModelTrialInfoTypeEnum;
    export import SubscriptionExpiredEventModel = models.SubscriptionExpiredEventModel;
    export import SubscriptionExpiredEventModelEventTypeEnum = models.SubscriptionExpiredEventModelEventTypeEnum;
    export import SubscriptionExpiredEventModelData = models.SubscriptionExpiredEventModelData;
    export import SubscriptionLineItemModel = models.SubscriptionLineItemModel;
    export import SubscriptionLineItemModelBillingTypeEnum = models.SubscriptionLineItemModelBillingTypeEnum;
    export import SubscriptionLineItemModelProductInfo = models.SubscriptionLineItemModelProductInfo;
    export import SubscriptionPausedEventModel = models.SubscriptionPausedEventModel;
    export import SubscriptionPausedEventModelEventTypeEnum = models.SubscriptionPausedEventModelEventTypeEnum;
    export import SubscriptionPausedEventModelData = models.SubscriptionPausedEventModelData;
    export import SubscriptionRedemptionStartedEventModel = models.SubscriptionRedemptionStartedEventModel;
    export import SubscriptionRedemptionStartedEventModelEventTypeEnum = models.SubscriptionRedemptionStartedEventModelEventTypeEnum;
    export import SubscriptionRedemptionStartedEventModelData = models.SubscriptionRedemptionStartedEventModelData;
    export import SubscriptionRenewedEventModel = models.SubscriptionRenewedEventModel;
    export import SubscriptionRenewedEventModelEventTypeEnum = models.SubscriptionRenewedEventModelEventTypeEnum;
    export import SubscriptionRenewedEventModelData = models.SubscriptionRenewedEventModelData;
    export import SubscriptionResumedEventModel = models.SubscriptionResumedEventModel;
    export import SubscriptionResumedEventModelEventTypeEnum = models.SubscriptionResumedEventModelEventTypeEnum;
    export import SubscriptionResumedEventModelData = models.SubscriptionResumedEventModelData;
    export import SubscriptionScheduledForCancellationEventModel = models.SubscriptionScheduledForCancellationEventModel;
    export import SubscriptionScheduledForCancellationEventModelEventTypeEnum = models.SubscriptionScheduledForCancellationEventModelEventTypeEnum;
    export import SubscriptionScheduledForCancellationEventModelData = models.SubscriptionScheduledForCancellationEventModelData;
    export import SubscriptionScheduledForCreationEventModel = models.SubscriptionScheduledForCreationEventModel;
    export import SubscriptionScheduledForCreationEventModelEventTypeEnum = models.SubscriptionScheduledForCreationEventModelEventTypeEnum;
    export import SubscriptionScheduledForCreationEventModelData = models.SubscriptionScheduledForCreationEventModelData;
    export import SubscriptionScheduledForPauseEventModel = models.SubscriptionScheduledForPauseEventModel;
    export import SubscriptionScheduledForPauseEventModelEventTypeEnum = models.SubscriptionScheduledForPauseEventModelEventTypeEnum;
    export import SubscriptionScheduledForPauseEventModelData = models.SubscriptionScheduledForPauseEventModelData;
    export import SubscriptionTrialActivatedEventModel = models.SubscriptionTrialActivatedEventModel;
    export import SubscriptionTrialActivatedEventModelEventTypeEnum = models.SubscriptionTrialActivatedEventModelEventTypeEnum;
    export import SubscriptionTrialActivatedEventModelData = models.SubscriptionTrialActivatedEventModelData;
    export import SubscriptionUnpaidEventModel = models.SubscriptionUnpaidEventModel;
    export import SubscriptionUnpaidEventModelEventTypeEnum = models.SubscriptionUnpaidEventModelEventTypeEnum;
    export import SubscriptionUnpaidEventModelData = models.SubscriptionUnpaidEventModelData;
    export import SubscriptionUpdatedEventModel = models.SubscriptionUpdatedEventModel;
    export import SubscriptionUpdatedEventModelEventTypeEnum = models.SubscriptionUpdatedEventModelEventTypeEnum;
    export import SubscriptionUpdatedEventModelData = models.SubscriptionUpdatedEventModelData;
    export import TaxRegistration = models.TaxRegistration;
    export import TaxRegistrationSchemeEnum = models.TaxRegistrationSchemeEnum;
    export import TaxRegistrationRequest = models.TaxRegistrationRequest;
    export import TaxRegistrationRequestSchemeEnum = models.TaxRegistrationRequestSchemeEnum;
    export import TaxRegistrationRequestValidation = models.TaxRegistrationRequestValidation;
    export import TaxRegistrationValidation = models.TaxRegistrationValidation;
    export import TaxRegistrationValidationStatusEnum = models.TaxRegistrationValidationStatusEnum;
    export import TaxRegistrationValidationSourceEnum = models.TaxRegistrationValidationSourceEnum;
    export import TooManyRequestsErrorResponse = models.TooManyRequestsErrorResponse;
    export import TooManyRequestsErrorResponseCodeEnum = models.TooManyRequestsErrorResponseCodeEnum;
    export import TooManyRequestsErrorResponseContext = models.TooManyRequestsErrorResponseContext;
    export import TrialPeriodConfigModel = models.TrialPeriodConfigModel;
    export import TrialPeriodConfigModelDay = models.TrialPeriodConfigModelDay;
    export import TrialPeriodConfigModelDayUnitEnum = models.TrialPeriodConfigModelDayUnitEnum;
    export import TrialPeriodConfigModelMonth = models.TrialPeriodConfigModelMonth;
    export import TrialPeriodConfigModelMonthUnitEnum = models.TrialPeriodConfigModelMonthUnitEnum;
    export import TrialPeriodConfigModelQuarter = models.TrialPeriodConfigModelQuarter;
    export import TrialPeriodConfigModelQuarterUnitEnum = models.TrialPeriodConfigModelQuarterUnitEnum;
    export import TrialPeriodConfigModelWeek = models.TrialPeriodConfigModelWeek;
    export import TrialPeriodConfigModelWeekUnitEnum = models.TrialPeriodConfigModelWeekUnitEnum;
    export import TrialPeriodConfigModelYear = models.TrialPeriodConfigModelYear;
    export import TrialPeriodConfigModelYearUnitEnum = models.TrialPeriodConfigModelYearUnitEnum;
    export import UnauthenticatedErrorResponse = models.UnauthenticatedErrorResponse;
    export import UnauthenticatedErrorResponseCodeEnum = models.UnauthenticatedErrorResponseCodeEnum;
    export import UnauthorizedErrorResponse = models.UnauthorizedErrorResponse;
    export import UnauthorizedErrorResponseCodeEnum = models.UnauthorizedErrorResponseCodeEnum;
    export import UpdateAntifraudListRequest = models.UpdateAntifraudListRequest;
    export import UpdateCustomer422Response = models.UpdateCustomer422Response;
    export import UpdateCustomer422ResponseCodeEnum = models.UpdateCustomer422ResponseCodeEnum;
    export import UpdateCustomerRequest = models.UpdateCustomerRequest;
    export import UpdateCustomerRequestStatusEnum = models.UpdateCustomerRequestStatusEnum;
    export import UpdateCustomerRequestTypeEnum = models.UpdateCustomerRequestTypeEnum;
    export import UpdateCustomerRequestTax = models.UpdateCustomerRequestTax;
    export import UpdateCustomerRequestTaxTaxabilityEnum = models.UpdateCustomerRequestTaxTaxabilityEnum;
    export import UpdateInvoice422Response = models.UpdateInvoice422Response;
    export import UpdateInvoice422ResponseCodeEnum = models.UpdateInvoice422ResponseCodeEnum;
    export import UpdateInvoiceRequest = models.UpdateInvoiceRequest;
    export import UpdateInvoiceRequestCustomer = models.UpdateInvoiceRequestCustomer;
    export import UpdateSubscription422Response = models.UpdateSubscription422Response;
    export import UpdateSubscription422ResponseCodeEnum = models.UpdateSubscription422ResponseCodeEnum;
    export import UpdateSubscriptionRequest = models.UpdateSubscriptionRequest;
    export import UpdateSubscriptionRequestApplication = models.UpdateSubscriptionRequestApplication;
    export import UpdateSubscriptionRequestApplicationModeEnum = models.UpdateSubscriptionRequestApplicationModeEnum;
    export import UpdateSubscriptionRequestApplicationSettings = models.UpdateSubscriptionRequestApplicationSettings;
    export import UpdateSubscriptionRequestApplicationSettingsBillingAnchorEnum = models.UpdateSubscriptionRequestApplicationSettingsBillingAnchorEnum;
    export import UpdateSubscriptionRequestApplicationSettingsProrationModeEnum = models.UpdateSubscriptionRequestApplicationSettingsProrationModeEnum;
    export import UpdateSubscriptionRequestLineItemsUpdates = models.UpdateSubscriptionRequestLineItemsUpdates;
    export import UpdateSubscriptionRequestLineItemsUpdatesToAddInner = models.UpdateSubscriptionRequestLineItemsUpdatesToAddInner;
    export import UpdateSubscriptionRequestLineItemsUpdatesToUpdateInner = models.UpdateSubscriptionRequestLineItemsUpdatesToUpdateInner;
    export import UpdateSubscriptionRequestTrialEndUpdate = models.UpdateSubscriptionRequestTrialEndUpdate;
    export import UpdateWebhookRequest = models.UpdateWebhookRequest;
    export import UpdateWebhookRequestStatusEnum = models.UpdateWebhookRequestStatusEnum;
    export import ValidationErrorResponse = models.ValidationErrorResponse;
    export import ValidationErrorResponseCodeEnum = models.ValidationErrorResponseCodeEnum;
    export import ValidationErrorResponseContext = models.ValidationErrorResponseContext;
    export import ValidationErrorResponseContextConstraintsValue = models.ValidationErrorResponseContextConstraintsValue;
    export import VoidInvoiceRequest = models.VoidInvoiceRequest;
    export import WebhookDomainModel = models.WebhookDomainModel;
    export import WebhookDomainModelStatusEnum = models.WebhookDomainModelStatusEnum;
    export import WebsiteModel = models.WebsiteModel;
    export import SolidgateEvent = webhooks.SolidgateEvent;
    export import SolidgateEventType = webhooks.SolidgateEventType;
    export import UnknownEvent = webhooks.UnknownEvent;
    export import SOLIDGATE_EVENT_TYPES = webhooks.SOLIDGATE_EVENT_TYPES;
    export import parseEvent = webhooks.parseEvent;
    export import isKnownEvent = webhooks.isKnownEvent;
}
