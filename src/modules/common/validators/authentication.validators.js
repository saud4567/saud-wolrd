const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ username, mpin, biometric, password }) => {
  if (sharedValidators.isRequired(username)) {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE001
    );
  }

  if (sharedValidators.isRequired(mpin) && sharedValidators.isRequired(biometric) && sharedValidators.isRequired(password)) {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE009
    );
  }

  return {
    username,
    mpin,
    biometric,
    password
  };
};
