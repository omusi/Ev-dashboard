import { KeyValue } from 'app/types/GlobalType';

export const logLevels: KeyValue[] = [
  {key: 'E', value: 'logs.error'},
  {key: 'W', value: 'logs.warning'},
  {key: 'I', value: 'logs.info'},
  {key: 'D', value: 'logs.debug'},
];

export const logActions: KeyValue[] = [
  {key: 'Authorize', value: 'Authorize'},
  {key: 'BuildConsumption', value: 'BuildConsumption'},
  {key: 'BootNotification', value: 'BootNotification'},
  {key: 'ChargingStationOcppParameters', value: 'ChargingStationOcppParameters'},
  {key: 'ChargingStationConsumption', value: 'ChargingStationConsumption'},
  {key: 'ChargingStationDelete', value: 'ChargingStationDelete'},
  {key: 'ChargingStationRequestOcppParameters', value: 'ChargingStationRequestOcppParameters'},
  {key: 'ChargingStationUpdateParams', value: 'ChargingStationUpdateParams'},
  {key: 'ClearCache', value: 'ClearCache'},
  {key: 'ChargingProfileDelete', value: 'ChargingProfileDelete'},
  {key: 'DataTransfer', value: 'DataTransfer'},
  {key: 'Heartbeat', value: 'Heartbeat'},
  {key: 'GetCompositeSchedule', value: 'GetCompositeSchedule'},
  {key: 'GetConfiguration', value: 'GetConfiguration'},
  {key: 'Initialization', value: 'Initialization'},
  {key: 'Login', value: 'Login'},
  {key: 'FirmwareDownload', value: 'FirmwareDownload'},
  {key: 'LogsCleanup', value: 'LogsCleanup'},
  {key: 'MeterValues', value: 'MeterValues'},
  {key: 'Migration', value: 'Migration'},
  {key: 'NotifyChargingStationStatusError', value: 'NotifyChargingStationStatusError'},
  {key: 'NotifyChargingStationRegistered', value: 'NotifyChargingStationRegistered'},
  {key: 'NotifyEndOfCharge', value: 'NotifyEndOfCharge'},
  {key: 'NotifyEndOfSession', value: 'NotifyEndOfSession'},
  {key: 'NotifyNewPassword', value: 'NotifyNewPassword'},
  {key: 'NotifyNewRegisteredUser', value: 'NotifyNewRegisteredUser'},
  {key: 'NotifyRequestPassword', value: 'NotifyRequestPassword'},
  {key: 'NotifyTransactionStarted', value: 'NotifyTransactionStarted'},
  {key: 'NotifyUnknownUserBadged', value: 'NotifyUnknownUserBadged'},
  {key: 'NotifyUserAccountStatusChanged', value: 'NotifyUserAccountStatusChanged'},
  {key: 'NotifySessionNotStartedAfterAuthorize', value: 'NotifySessionNotStartedAfterAuthorize'},
  {key: 'NotifyCarSynchronizationFailed', value: 'NotifyCarSynchronizationFailed'},
  {key: 'OcpiPatchLocations', value: 'OcpiPatchLocations'},
  {key: 'OcpiEndpointSendEVSEStatuses', value: 'OcpiEndpointSendEVSEStatuses'},
  {key: 'OcpiGetVersions', value: 'OcpiGetVersions'},
  {key: 'OcpiPostCredentials', value: 'OcpiPostCredentials'},
  {key: 'OcpiEndpointUpdate', value: 'OcpiEndpointUpdate'},
  {key: 'OcpiEndpointRegister', value: 'OcpiEndpointRegister'},
  {key: 'OcpiEndpointCreate', value: 'OcpiEndpointCreate'},
  {key: 'OcpiEndpointDelete', value: 'OcpiEndpointDelete'},
  {key: 'OcpiEndpointPing', value: 'OcpiEndpointPing'},
  {key: 'OcpiEndpoint', value: 'OcpiEndpoint'},
  {key: 'OcpiEndpointGenerateLocalToken', value: 'OcpiEndpointGenerateLocalToken'},
  {key: 'OcpiGetLocations', value: 'OcpiGetLocations'},
  {key: 'PricingUpdate', value: 'PricingUpdate'},
  {key: 'RegisterUser', value: 'RegisterUser'},
  {key: 'VerifyEmail', value: 'VerifyEmail'},
  {key: 'ResendVerificationEmail', value: 'ResendVerificationEmail'},
  {key: 'RemoteStartTransaction', value: 'RemoteStartTransaction'},
  {key: 'RemoteStopTransaction', value: 'RemoteStopTransaction'},
  {key: 'RequestConfiguration', value: 'RequestConfiguration'},
  {key: 'TransactionsInError', value: 'TransactionsInError'},
  {key: 'Reset', value: 'Reset'},
  {key: 'SendEmail', value: 'SendEmail'},
  {key: 'SendEmailBackup', value: 'SendEmailBackup'},
  {key: 'ChargingProfileUpdate', value: 'ChargingProfileUpdate'},
  {key: 'SessionHashHandling', value: 'SessionHashHandling'},
  {key: 'SiteAreaCreate', value: 'SiteAreaCreate'},
  {key: 'SiteAreaDelete', value: 'SiteAreaDelete'},
  {key: 'SiteAreaUpdate', value: 'SiteAreaUpdate'},
  {key: 'SiteDelete', value: 'SiteDelete'},
  {key: 'SiteUpdate', value: 'SiteUpdate'},
  {key: 'StartTransaction', value: 'StartTransaction'},
  {key: 'Startup', value: 'Startup'},
  {key: 'StatusNotification', value: 'StatusNotification'},
  {key: 'StopTransaction', value: 'StopTransaction'},
  {key: 'TransactionDelete', value: 'TransactionDelete'},
  {key: 'TransactionSoftStop', value: 'TransactionSoftStop'},
  {key: 'UserCreate', value: 'UserCreate'},
  {key: 'UserDelete', value: 'UserDelete'},
  {key: 'WSRestClientConnectionOpen', value: 'WSRestClientConnectionOpen'},
  {key: 'WSRestClientConnectionOpened', value: 'WSRestClientConnectionOpened'},
  {key: 'WSRestClientConnectionClosed', value: 'WSRestClientConnectionClosed'},
  {key: 'WSRestClientMessage', value: 'WSRestClientMessage'},
  {key: 'WSRestClientErrorResponse', value: 'WSRestClientErrorResponse'},
  {key: 'WSRestClientSendMessage', value: 'WSRestClientSendMessage'},
  {key: 'WSClientError', value: 'WSClientError'},
  {key: 'GenericOCPPCommand', value: 'GenericOCPPCommand'},
  {key: 'GetAccessToken', value: 'GetAccessToken'},
  {key: 'Refund', value: 'Refund'},
  {key: 'RefundSynchronize', value: 'RefundSynchronize'},
  {key: 'HttpRequestLog', value: 'HttpRequestLog'},
  {key: 'WSVerifyClient', value: 'WSVerifyClient'},
  {key: 'WSRestServerConnectionOpened', value: 'WSRestServerConnectionOpened'},
  {key: 'WSRestServerConnectionClosed', value: 'WSRestServerConnectionClosed'},
  {key: 'WSJsonConnectionOpened', value: 'WSJsonConnectionOpened'},
  {key: 'WSJsonErrorReceived', value: 'WSJsonErrorReceived'},
  {key: 'WSJsonConnectionClose', value: 'WSJsonConnectionClose'},
  {key: 'WSError', value: 'WSError'},
  {key: 'StrongSoapDebug', value: 'StrongSoapDebug'},
  {key: 'SecurePing', value: 'SecurePing'},
  {key: 'UserUpdate', value: 'UserUpdate'},
  {key: 'SettingUpdate', value: 'SettingUpdate'},
  {key: 'UpdateChargingStationTemplates', value: 'UpdateChargingStationTemplates'},
  {key: 'Scheduler', value: 'Scheduler'},
  {key: 'SiteUserAdmin', value: 'SiteUserAdmin'},
  {key: 'RegistrationTokens', value: 'RegistrationTokens'},
  {key: 'RegistrationTokenRevoke', value: 'RegistrationTokenRevoke'},
  {key: 'AllTransactions', value: 'AllTransactions'},
  {key: 'CompanyLogos', value: 'CompanyLogos'},
  {key: 'CompanyUpdate', value: 'CompanyUpdate'},
  {key: 'BuildingImages', value: 'BuildingImages'},
  {key: 'BuildingUpdate', value: 'BuildingUpdate'},
  {key: 'AddSitesToUser', value: 'AddSitesToUser'},
  {key: 'SessionHashService', value: 'SessionHashService'},
  {key: 'ChargingStationConsumptionFromTransaction', value: 'ChargingStationConsumptionFromTransaction'},
  {key: 'NotifyVerificationEmail', value: 'NotifyVerificationEmail'},
  {key: 'NotifyAuthentificationErrorEmailServer', value: 'NotifyAuthentificationErrorEmailServer'},
  {key: 'NotifyPatchEVSEStatusError', value: 'NotifyPatchEVSEStatusError'},
  {key: 'NotifyUserAccountInactivity', value: 'NotifyUserAccountInactivity'},
  {key: 'NotifyPreparingSessionNotStarted', value: 'NotifyPreparingSessionNotStarted'},
  {key: 'NotifyOfflineChargingStations', value: 'NotifyOfflineChargingStations'},
  {key: 'NotifyBillingUserSynchronizationFailed', value: 'NotifyBillingUserSynchronizationFailed'},
  {key: 'RemoveSitesFromUser', value: 'RemoveSitesFromUser'},
  {key: 'UserImage', value: 'UserImage'},
  {key: 'Logging', value: 'Logging'},
  {key: 'GetConnectorCurrentLimit', value: 'GetConnectorCurrentLimit'},
  {key: 'ChargingStation', value: 'ChargingStation'},
  {key: 'ChangeConfiguration', value: 'ChangeConfiguration'},
  {key: 'Transaction', value: 'Transaction'},
  {key: 'GetDiagnostics', value: 'GetDiagnostics'},
  {key: 'IntegrationConnections', value: 'IntegrationConnections'},
  {key: 'Settings', value: 'Settings'},
  {key: 'ChargingStationTemplate', value: 'ChargingStationTemplate'},
  {key: 'RemotePushNotification', value: 'RemotePushNotification'},
  {key: 'CleanupTransaction', value: 'CleanupTransaction'},
  {key: 'TransactionsCompleted', value: 'TransactionsCompleted'},
  {key: 'ChargingStationLimitPower', value: 'ChargingStationLimitPower'},
  {key: 'UpdateUserMobileToken', value: 'UpdateUserMobileToken'},
  {key: 'NotifyOptimalChargeReached', value: 'NotifyOptimalChargeReached'},
  {key: 'ExtraInactivity', value: 'ExtraInactivity'},
  {key: 'SynchronizeCars', value: 'SynchronizeCars'},
  {key: 'BillingSynchronizeUsers', value: 'BillingSynchronizeUsers'},
  {key: 'BillingForceSynchronizeUser', value: 'BillingForceSynchronizeUser'},
  {key: 'BillingCheckConnection', value: 'BillingCheckConnection'},
  {key: 'BillingSendInvoice', value: 'BillingSendInvoice'},
  {key: 'BillingGetOpenedInvoice', value: 'BillingGetOpenedInvoice'},
  {key: 'BillingCreateInvoice', value: 'BillingCreateInvoice'},
  {key: 'BillingCreateInvoiceItem', value: 'BillingCreateInvoiceItem'},
  {key: 'SAPSmartCharging', value: 'SAPSmartCharging'},
].sort((action1, action2) => {
  if (action1.value.toLocaleLowerCase() < action2.value.toLocaleLowerCase()) {
    return -1;
  }
  if (action1.value.toLocaleLowerCase() > action2.value.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
});

export const logHosts: KeyValue[] = [
  {key: 'sap-ev-batch-server-dev', value: 'sap-ev-batch-server-dev'},
  {key: 'sap-ev-batch-server-prod', value: 'sap-ev-batch-server-prod'},
  {key: 'sap-ev-batch-server-server-qa', value: 'sap-ev-batch-server-qa'},
  {key: 'sap-ev-chargebox-json-server-dev', value: 'sap-ev-chargebox-json-server-dev'},
  {key: 'sap-ev-chargebox-json-server-prod', value: 'sap-ev-chargebox-json-server-prod'},
  {key: 'sap-ev-chargebox-json-server-qa', value: 'sap-ev-chargebox-json-server-qa'},
  {key: 'sap-ev-chargebox-soap-server-dev', value: 'sap-ev-chargebox-soap-server-dev'},
  {key: 'sap-ev-chargebox-soap-server-prod', value: 'sap-ev-chargebox-soap-server-prod'},
  {key: 'sap-ev-chargebox-soap-server-qa', value: 'sap-ev-chargebox-soap-server-qa'},
  {key: 'sap-ev-front-end-dev', value: 'sap-ev-front-end-dev'},
  {key: 'sap-ev-front-end-prod', value: 'sap-ev-front-end-prod'},
  {key: 'sap-ev-front-end-qa', value: 'sap-ev-front-end-qa'},
  {key: 'sap-ev-ocpi-server-dev', value: 'sap-ev-ocpi-server-dev'},
  {key: 'sap-ev-ocpi-server-prod', value: 'sap-ev-ocpi-server-prod'},
  {key: 'sap-ev-ocpi-server-qa', value: 'sap-ev-ocpi-server-qa'},
  {key: 'sap-ev-odata-server-dev', value: 'sap-ev-odata-server-dev'},
  {key: 'sap-ev-odata-server-prod', value: 'sap-ev-odata-server-prod'},
  {key: 'sap-ev-odata-server-qa', value: 'sap-ev-odata-server-qa'},
  {key: 'sap-ev-rest-server-dev', value: 'sap-ev-rest-server-dev'},
  {key: 'sap-ev-rest-server-prod', value: 'sap-ev-rest-server-prod'},
  {key: 'sap-ev-rest-server-qa', value: 'sap-ev-rest-server-qa'},
  {key: 'sap-ev-fake-rest-server-dev', value: 'sap-ev-fake-rest-server-dev'},
].sort((host1, host2) => {
  if (host1.value.toLocaleLowerCase() < host2.value.toLocaleLowerCase()) {
    return -1;
  }
  if (host1.value.toLocaleLowerCase() > host2.value.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
});
