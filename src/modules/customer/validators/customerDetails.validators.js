const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = (req) => {
  let apiKey = req.headers["api-key"];
  let apiSecret = req.headers["api-secret"];
  let token = req.headers.authorization;
  let customerId = req.body.customer_id;
  let requestedData = req.body.requested_data;

  // if (sharedValidators.isRequired(apiKey)) {
  //   sharedServices.error.throw(
  //     customerModuleConstants.customerDetails.errorMessages.CCDE001
  //   );
  // }

  if (apiKey && apiKey !== sharedConstants.appConfig.app.apiKey) {
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE002
    );
  }

  // if (sharedValidators.isRequired(apiSecret)) {
  //   sharedServices.error.throw(
  //     customerModuleConstants.customerDetails.errorMessages.CCDE003
  //   );
  // }

  if (apiSecret && apiSecret !== sharedConstants.appConfig.app.apiSecret) {
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE004
    );
  }

  // if (sharedValidators.isRequired(customerId)) {
  //   sharedServices.error.throw(
  //     customerModuleConstants.customerDetails.errorMessages.CCDE005
  //   );
  // }

  // if (sharedValidators.isRequired(requestedData) || requestedData === 0) {
  //   sharedServices.error.throw(
  //     customerModuleConstants.customerDetails.errorMessages.CCDE006
  //   );
  // }

  if (requestedData && !sharedValidators.isArray(requestedData)) {
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE007
    );
  }

  return {
    token,
    customerId,
    requestedData,
  };
};
