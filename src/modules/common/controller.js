const commonModuleConstants = require("./constants");
const commonModuleServices = require("./services");
const commonModuleValidators = require("./validators");

const commonModuleControllers = {};

// controller_name: encryptionDecryption
// controller_description:
//      controller used to encrypt or Decryp request payload
commonModuleControllers.encryptionDecryption = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = commonModuleValidators.encryptionDecryption(req.body);

    /** handle logic within service function */
    const data = await commonModuleServices.encyptionDecryption({
      type: validateBody.type,
      keyType: validateBody.keyType,
      data: validateBody.data,
      requestId: req.requestId,
    });

    /**return response */
    next({
      ...commonModuleConstants.encryptionDecryption.messages.CMS001,
      result: data,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

module.exports = commonModuleControllers;
