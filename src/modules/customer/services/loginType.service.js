const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({ username, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Login Type- Request params",
    msg: "Request params recieved",
    username,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Login Type - Customer Credentials",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.authentication.errorMessages.CAE005,
    });

    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );
  }

  /** get customer authentication details*/
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  /** set if customer first time login or not */
  let isFirstLogin = true;
  if (customerAuthentication.length > 0 && customerAuthentication[0].mpin) {
    isFirstLogin = false;
  }

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Login Type- First time login",
    msg: "Check if customer first time login or not",
    username,
    customerId: customerDetails[0].customerId,
    isFirstLogin,
  });

  return {
    isFirstLogin: isFirstLogin,
    subscriptionPlan: customerDetails[0].subscription_plan,
  };
};
