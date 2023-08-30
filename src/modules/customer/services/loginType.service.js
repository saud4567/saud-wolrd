const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({ username }) => {
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  /** get customer authentication details*/
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  /** set if customer first time login or not */
  let isFirstLogin = true;
  if (customerAuthentication.length > 0 && customerAuthentication[0].mpin) {
    isFirstLogin = false;
  }

  return {
    isFirstLogin: isFirstLogin,
    subscriptionPlan: customerDetails[0].subscription_plan,
  };
};
