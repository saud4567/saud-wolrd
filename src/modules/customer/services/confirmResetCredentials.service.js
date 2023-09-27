const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");
const tradingPlatformUpdateService = require("../../common/services/tradingPlatformUpdate.service");

module.exports = async ({ resetRequestId, resetCredentials, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Reset Credentials- Request params",
    msg: "Request params recieved",
    resetRequestId,
  });
  /** get customer details using username*/
  const customerResetData = await sharedModels.customerPasswordReset.read({
    resetRequestId,
  });

  if (!customerResetData.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Reset Credentials - Reset Credentials request",
      msg: "Credentials reset request not found",
      resetRequestId,
      error:
        customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE003,
    });
    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE003
    );
  }

  /** check if reset request is expired or not */
  if (new Date() >= customerResetData[0].reset_request_expiry) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Reset Credentials - Reset Credentials request",
      msg: "Credentials reset request not found",
      customerId: customerResetData[0].customer_id,
      error:
        customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE003,
    });

    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE004
    );
  }

  /** get customer old credentials data */
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerResetData[0].customer_id }
  );

  let oldCredentials;
  let updateParams = {};
  /** password,mpin and biometric encryption */
  // const newCredentialsHash = await sharedServices.authServices.getPasswordHash(
  //   resetCredentials
  // );
  if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD
  ) {
    if (!sharedValidators.isValidPassword(resetCredentials)) {
      sharedServices.error.throw(
        customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE006
      );
    }
    updateParams.password = resetCredentials;
    updateParams.pwdLastSetDate = moment().format("YYYY-MM-DD HH:mm:ss");
    oldCredentials = customerAuthentication[0].password;
  } else if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.MPIN
  ) {
    if (!sharedValidators.isValidMpin(resetCredentials)) {
      sharedServices.error.throw(
        customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE005
      );
    }
    updateParams.mpin = resetCredentials;
    updateParams.mpinLastSetDate = moment().format("YYYY-MM-DD HH:mm:ss");
    oldCredentials = customerAuthentication[0].mpin;
  } else if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.BIOMETRIC
  ) {
    updateParams.biometric = resetCredentials;
    oldCredentials = customerAuthentication[0].biometric;
  }

  updateParams.failedLoginAttempt = 0;
  updateParams.isLoginBlocked = 0;

  /**Update credential into customer_authentication table */
  await sharedModels.customerAuthentication.update(updateParams, {
    customerId: customerResetData[0].customer_id,
  });

  const customerDetails = await sharedModels.customer.read({
    customerId: customerResetData[0].customer_id,
  });

  if (
    customerResetData[0].authorization_mode ==
      customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD ||
    customerResetData[0].authorization_mode ==
      customerModuleConstants.confirmResetCredentials.RESET_TYPE.MPIN
  ) {
    /**update password on trading platform */
    sharedServices.loggerServices.success.info({
      requestId,
      stage:
        "Customer Reset Credentials- update password/mpin on trading platform",
      msg: "Update password/mpin on trading platform",
      customerRefId: customerDetails[0].customer_ref_id,
      customerId: customerDetails[0].customerId,
    });

    const tradingPlatformUpdate = await tradingPlatformUpdateService({
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
      resetMode: customerResetData[0].authorization_mode,
      oldCredentials,
      newCredentials: resetCredentials,
      requestId,
    });
  }
};
