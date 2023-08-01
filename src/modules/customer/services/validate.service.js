const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = async ({ token }) => {
  /** check if token is valid or not */
  const isValid = sharedServices.authServices.validateJWT(
    token,
    sharedConstants.appConfig.app.userJWTSecret
  );
  if (isValid) {
    return {
      isValid: true,
    };
  }
};
