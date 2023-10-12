const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const dbLoggerServices = require("shared/services/dbLogger.services");
const customerModuleConstants = require("../../customer/constants");
const sharedModels = require("shared/models");
const axios = require("axios");

module.exports = async ({
  customerId,
  resetMode,
  oldCredentials,
  newCredentials,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Trading Platform Update- Request params",
    msg: "Request params recieved",
  });

  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ customerId });

  let payload = {
    user_id: customerDetails[0].ucc_id,
    source: sharedConstants.appConfig.tradingPlatform.trading_platform_source,
    api_key:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXN0b21lcklkIjoiMTMwNSIsImV4cCI6MTcxMTAzNjc0MCwiaWF0IjoxNjc5NTAwNzgwfQ.64-QfjZ2V2GfLcsXd-PNAPpINA_ovxu7YLbrVUq2yvg",
  };

  if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.password.toUpperCase()
  ) {
    payload.old_password = oldCredentials;
    payload.new_password = newCredentials;
  } else if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin.toUpperCase()
  ) {
    payload.old_mpin = oldCredentials;
    payload.new_mpin = newCredentials;
  }

  const requestUrl =
    sharedConstants.appConfig.tradingPlatform.trading_platform_url +
    resetMode.toLowerCase();

  payload = JSON.stringify(payload);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key":
      sharedConstants.appConfig.tradingPlatform.trading_platform_api_key,
  };

  await dbLoggerServices.log({
    customerId: customerId,
    action: requestUrl,
    request: payload,
  });

  const res = await axios.put(requestUrl, payload, { headers });

  if (res) {
    await dbLoggerServices.log({
      customerId: customerId,
      action: requestUrl,
      request: JSON.stringify(payload),
      response: JSON.stringify(res.message),
      code: res.status,
    });
  }
};
