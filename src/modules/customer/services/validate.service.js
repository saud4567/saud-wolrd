const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = async ({ token, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer token Validate- Request params",
    msg: "Request params recieved",
    token,
  });
  /** check if token is valid or not */
  const isValid = sharedServices.authServices.validateJWT(
    token,
    sharedConstants.appConfig.app.userJWTSecret
  );
  if (isValid) {
    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Customer token Validate",
      msg: "token validated successfully",
      token,
      customerId: isValid.customerId,
    });
    return { isValid: true };
  }
};
