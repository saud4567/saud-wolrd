const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");
const encryptionServices = require("shared/services/encryption.services");

module.exports = async ({ token }) => {
  /** check if token is valid or not */
  const isValid = sharedServices.authServices.validateJWT(
    token,
    sharedConstants.appConfig.app.userJWTSecret
  );
  if (isValid) {
    /**encrypt response */
    const encyptedResponse = await encryptionServices.encryptUsingRsaAlgorithm(JSON.stringify({ isValid: true }));

    return encyptedResponse;

  }
};
