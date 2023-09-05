const sharedServices = require("shared/services");
const dbLoggerServices = require("shared/services/dbLogger.services");
const customerModuleConstants = require("../../customer/constants");
const axios = require("axios");

module.exports = async ({
  customerId,
  customerRefId,
  resetMode,
  changedCredentials,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Trading Platform Update- Request params",
    msg: "Request params recieved",
  });

  // Note: change the url to actual URL
  let payload = {};
  payload.customer_ref_id = customerRefId;
  if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.password.toUpperCase()
  ) {
    payload.password = changedCredentials;
  } else if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin.toUpperCase()
  ) {
    payload.mpin = changedCredentials;
  }

  const requestUrl = "";

  payload = JSON.stringify(payload);

  const headers = {
    "Content-Type": "application/json",
  };
  // const res = await axios.post(requestUrl, payload, { headers });

  // if (res.status == 200) {
  //   await dbLoggerServices.log({
  //     customerId: customerId,
  //     action: requestUrl,
  //     request: payload,
  //     response: res.data,
  //     code: res.status,
  //   });
  // } else {
  //   await dbLoggerServices.log({
  //     customerId: customerId,
  //     action: requestUrl,
  //     request: payload,
  //     response: res.message,
  //     code: res.status,
  //   });
  // }
};
