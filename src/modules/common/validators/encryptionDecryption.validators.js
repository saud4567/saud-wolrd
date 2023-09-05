const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const commonModuleConstants = require("../constants");

module.exports = ({ type, keyType, data }) => {
  if (sharedValidators.isRequired(type)) {
    sharedServices.error.throw(
      commonModuleConstants.encryptionDecryption.errorMessages.CME001
    );
  }

  if (sharedValidators.isRequired(data)) {
    sharedServices.error.throw(
      commonModuleConstants.encryptionDecryption.errorMessages.CME002
    );
  }

  if (sharedValidators.isRequired(keyType)) {
    sharedServices.error.throw(
      commonModuleConstants.encryptionDecryption.errorMessages.CME003
    );
  }
  return {
    type,
    keyType,
    data,
  };
};
