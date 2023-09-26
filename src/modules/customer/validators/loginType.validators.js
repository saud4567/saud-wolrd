const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ username }) => {
  if (sharedValidators.isRequired(username)) {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE001
    );
  }

  return {
    username,
  };
};
