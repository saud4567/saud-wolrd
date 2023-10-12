const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({ username, twoFa, password, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer First time login validate- Request params",
    msg: "Request params recieved",
    username,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer First time login validate - Customer Credentials",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.authentication.errorMessages.CAE005,
    });
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );
  }

  /** check if two factor authentication and password valid or not */
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer First time login validate- two factor authentication",
    msg: "Check if two factor authentication and passord is valid or not",
    username,
    customerId: customerDetails[0].customerId,
    twoFa,
  });

  let isValid = false;
  if (
    customerDetails[0].subscription_plan ==
    customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    if (!password) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE013
      );
    }

    /** get customer authentication data */
    const customerAuthentication =
      await sharedModels.customerAuthentication.read({
        customerId: customerDetails[0].customerId,
      });
    let passwordHash = customerAuthentication[0].password;

    /**compare credentials */
    const match = await sharedServices.authServices.comparePassword(
      password,
      passwordHash
    );

    if (
      match &&
      (twoFa == customerDetails[0].pan || twoFa == customerDetails[0].dob)
    ) {
      isValid = true;
    }
  } else if (
    twoFa == customerDetails[0].pan ||
    twoFa == customerDetails[0].dob
  ) {
    isValid = true;
  }

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer First time login validate- two factor authentication",
    msg: "Check if two factor authentication and passord is valid or not",
    username,
    customerId: customerDetails[0].customerId,
    isValid,
  });
  return { isValid: isValid };
};
