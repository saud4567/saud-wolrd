const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const customerModuleConstants = require("../../customer/constants");
const axios = require("axios");

module.exports = async ({ customer_ref_id, resetMode, changedCredentials }) => {
  // Note: change the url to actual URL
  let payload = {};
  payload.customer_ref_id = customer_ref_id;
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
};
