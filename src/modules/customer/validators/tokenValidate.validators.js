const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ token }) => {
  if (sharedValidators.isRequired(token)) {
    sharedServices.error.throw(
      customerModuleConstants.validate.errorMessages.CVE001
    );
  }

  return {
    token,
  };
};
