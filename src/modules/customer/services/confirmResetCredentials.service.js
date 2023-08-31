const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");
const tradingPlatformUpdateService = require("../../common/services/tradingPlatformUpdate.service");

module.exports = async ({ resetRequestId, resetCredentials }) => {
  /** get customer details using username*/
  const customerResetData = await sharedModels.customerPasswordReset.read({
    resetRequestId,
  });

  if (!customerResetData.length) {
    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE003
    );
  }

  /** check if reset request is expired or not */
  if (new Date() >= customerResetData[0].reset_request_expiry) {
    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE004
    );
  }

  let updateParams = {};
  /** password,mpin and biometric encryption */
  const newCredentialsHash = await sharedServices.authServices.getPasswordHash(
    resetCredentials
  );
  if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD
  ) {
    updateParams.password = newCredentialsHash;
    updateParams.pwdLastSetDate = moment().format("YYYY-MM-DD HH:mm:ss");
  } else if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.MPIN
  ) {
    updateParams.mpin = newCredentialsHash;
    updateParams.mpinLastSetDate = moment().format("YYYY-MM-DD HH:mm:ss");
  } else if (
    customerResetData[0].authorization_mode ==
    customerModuleConstants.confirmResetCredentials.RESET_TYPE.BIOMETRIC
  ) {
    updateParams.biometric = newCredentialsHash;
  }

  /**Update credential into customer_authentication table */
  await sharedModels.customerAuthentication.update(updateParams, {
    customerId: customerResetData[0].customer_id,
  });

  if (
    customerResetData[0].authorization_mode ==
      customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD ||
    customerResetData[0].authorization_mode ==
      customerModuleConstants.confirmResetCredentials.RESET_TYPE.MPIN
  ) {
    /**update password on trading platform */

    const tradingPlatformUpdate = await tradingPlatformUpdateService({
      customer_ref_id: customerDetails[0].customer_ref_id,
      resetMode: customerResetData[0].authorization_mode,
      changedCredentials: resetCredentials,
    });
  }
};
