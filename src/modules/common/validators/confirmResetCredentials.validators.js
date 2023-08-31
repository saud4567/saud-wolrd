const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ reset_request_id, reset_credentials }) => {
  if (sharedValidators.isRequired(reset_request_id)) {
    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE001
    );
  }

  if (sharedValidators.isRequired(reset_credentials)) {
    sharedServices.error.throw(
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE002
    );
  }

  return {
    reset_request_id,
    reset_credentials,
  };
};
