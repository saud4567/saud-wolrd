const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const tradingPlatformUpdateService = require("../../common/services/tradingPlatformUpdate.service");

module.exports = async ({
  resetMode,
  changedCredentials,
  customerRefId,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer change credentials- Request params",
    msg: "Request params recieved",
    customerRefId,
  });
  /** check if customer already exist */
  const customerDetails = await sharedModels.customer.read({ customerRefId });

  if (!customerDetails) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer change credentials- Customer Details",
      msg: "Customer details not found",
      customerRefId,
      error: customerModuleConstants.customerDetails.errorMessages.CCDE008,
    });
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE008
    );
  }

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

  if (
    updateParams.password &&
    customerDetails[0].subscription_plan !=
      customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer change credentials- Password Change",
      msg: "Can not update password",
      customerRefId,
      error: customerModuleConstants.changeCredentials.errorMessages.CCCE003,
    });
    sharedServices.error.throw(
      customerModuleConstants.changeCredentials.errorMessages.CCCE003
    );
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

    sharedServices.loggerServices.success.info({
      requestId,
      stage:
        "Customer change credentials- update password/mpin on trading platform",
      msg: "Update password/mpin on trading platform",
      customerRefId: customerDetails[0].customer_ref_id,
      customerId: customerDetails[0].customerId,
    });

    const tradingPlatformUpdate = await tradingPlatformUpdateService({
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
      resetMode,
      changedCredentials,
      requestId,
    });
  }
};
