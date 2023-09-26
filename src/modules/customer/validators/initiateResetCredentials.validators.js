const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ username, two_fa, reset_mode }) => {
  if (sharedValidators.isRequired(username)) {
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE001
    );
  }

  if (sharedValidators.isRequired(two_fa)) {
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE002
    );
  }

  if (sharedValidators.isRequired(reset_mode)) {
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE003
    );
  }

  if (
    reset_mode &&
    !customerModuleConstants.authentication.AUTHORIZATION_TYPE.hasOwnProperty(
      reset_mode
    )
  ) {
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE006
    );
  }

  return {
    username,
    two_fa,
    reset_mode,
  };
};
