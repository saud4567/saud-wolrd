const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = ({ reset_mode, changed_credentials }) => {
  if (sharedValidators.isRequired(reset_mode)) {
    sharedServices.error.throw(
      customerModuleConstants.changeCredentials.errorMessages.CCCE001
    );
  }

  if (sharedValidators.isRequired(changed_credentials)) {
    sharedServices.error.throw(
      customerModuleConstants.changeCredentials.errorMessages.CCCE002
    );
  }

  if (
    reset_mode &&
    !customerModuleConstants.authentication.AUTHORIZATION_TYPE.hasOwnProperty(
      reset_mode
    )
  ) {
    sharedServices.error.throw(
      customerModuleConstants.changeCredentials.errorMessages.CCCE003
    );
  }
  return {
    reset_mode,
    changed_credentials,
  };
};
