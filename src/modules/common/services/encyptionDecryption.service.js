const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const encryptionServices = require("shared/services/encryption.services");

module.exports = async ({ type, keyType, data, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Encyption/Decyption Service- Request params",
    msg: "Request params recieved",
  });
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

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Encyption/Decyption Service",
    result,
  });
  return result;
};
