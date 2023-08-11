const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const customerModuleParsers = require("../parsers");
const encryptionServices = require("shared/services/encryption.services");

module.exports = async ({ token, customerRefId, requestedData }) => {
  if (token) {
    /** check if token is valid or not */
    const isValid = sharedServices.authServices.validateJWT(
      token,
      sharedConstants.appConfig.app.userJWTSecret
    );
    if (isValid) {
      customerRefId = isValid.customerRefId;
    }

  }
  /** get customer details using customerRefId*/
  let customerDetails = await sharedModels.customer.read({ customerRefId });

  if (!customerDetails.length)
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE008
    );

  customerDetails = customerDetails[0];

  let whereParams = {
    customerId: customerDetails.customerId,
  };
  if (!token) {
    whereParams.isDefault = 1
  }

  /** get customer bank and DP details */
  const customerBank = await sharedModels.customerBank.read(whereParams);
  const customerDp = await sharedModels.customerDp.read(whereParams);

  let resp = {};
  if (!token) {
    requestedData.map((rd) => {
      if (customerDetails.hasOwnProperty(rd)) {
        resp[rd] = customerDetails.hasOwnProperty(rd) ? customerDetails[rd] : "";
      } else if (customerBank && customerBank[0].hasOwnProperty(rd)) {
        resp[rd] = customerBank.map((cb) => cb[rd]);
      } else if (customerDp && customerDp[0].hasOwnProperty(rd)) {
        resp[rd] = customerDp.map((cd) => cd[rd]);
      }
    });
  } else {
    resp = customerModuleParsers.customerDetails({ customerDetails, customerBank, customerDp });
  }

  /**encrypt response */
  const encyptedResponse = await encryptionServices.encryptUsingRsaAlgorithm(JSON.stringify(resp));

  return encyptedResponse;
};
