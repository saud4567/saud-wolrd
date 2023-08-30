const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({ username, twoFa, password }) => {
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  /** check if two factor authentication and password valid or not */
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

  return { isValid: isValid };
};
