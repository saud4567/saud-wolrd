const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const encryptionServices = require("shared/services/encryption.services");

module.exports = async ({ type, keyType, data }) => {
  let result;
  if (type == "ENCRYPT") {
    result = encryptionServices.encryptUsingRsaAlgorithm(
      JSON.stringify(data),
      (keyType = keyType)
    );
  }

  if (type == "DECRYPT") {
    result = encryptionServices.decryptUsingRsaAlgorithm(
      data,
      (keyType = keyType)
    );
  }

  return result;
};
