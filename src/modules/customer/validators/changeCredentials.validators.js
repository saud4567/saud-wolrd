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

  if (
    reset_mode &&
    reset_mode == customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin
  ) {
    if (mpin && !sharedValidators.isValidMpin(mpin)) {
      sharedServices.error.throw(
        customerModuleConstants.changeCredentials.errorMessages.CCCE005
      );
    }
  }

  if (
    reset_mode &&
    reset_mode ==
      customerModuleConstants.authentication.AUTHORIZATION_TYPE.password
  ) {
    if (password && !sharedValidators.isValidPassword(password)) {
      sharedServices.error.throw(
        customerModuleConstants.changeCredentials.errorMessages.CCCE006
      );
    }
  }

  return {
    reset_mode,
    changed_credentials,
  };
};
