const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const tradingPlatformUpdateService = require("../../common/services/tradingPlatformUpdate.service");

module.exports = async ({ resetMode, changedCredentials, customerRefId }) => {
  /** check if customer already exist */
  const customerDetails = await sharedModels.customer.read({ customerRefId });

  if (!customerDetails)
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE008
    );

  let updateParams = {};
  /** password,mpin and biometric encryption */
  const newCredentialHash = await sharedServices.authServices.getPasswordHash(
    changedCredentials
  );
  if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.password.toUpperCase()
  ) {
    updateParams.password = newCredentialHash;
  } else if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin.toUpperCase()
  ) {
    updateParams.mpin = newCredentialHash;
  } else if (
    resetMode.toUpperCase() ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric.toUpperCase()
  ) {
    updateParams.biometric = newCredentialHash;
  }

  updateParams.failedLoginAttempt = 0;
  updateParams.isLoginBlocked = 0;

  /**Update credential into customer_authentication table */
  await sharedModels.customerAuthentication.update(updateParams, {
    customerId: customerDetails[0].customerId,
  });

  if (
    resetMode.toUpperCase() ==
      customerModuleConstants.authentication.AUTHORIZATION_TYPE.password.toUpperCase() ||
    resetMode.toUpperCase() ==
      customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin.toUpperCase()
  ) {
    /**update password on trading platform */

    const tradingPlatformUpdate = await tradingPlatformUpdateService({
      customer_ref_id: customerDetails[0].customer_ref_id,
      resetMode,
      changedCredentials,
    });
  }
};
