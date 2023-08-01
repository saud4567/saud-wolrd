const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ authorization }) => {
  if (sharedValidators.isRequired(authorization)) {
    sharedServices.error.throw(
      customerModuleConstants.validate.errorMessages.CVE001
    );
  }

  return {
    authorization,
  };
};
