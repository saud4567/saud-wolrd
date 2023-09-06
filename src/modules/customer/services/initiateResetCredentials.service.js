const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");

module.exports = async ({ username, twoFa, resetMode, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Initiate Reset Credentials- Request params",
    msg: "Request params recieved",
    username,
    twoFa,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Initiate Reset Credentials- Customer Details",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.authentication.errorMessages.CIRCE004,
    });
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE004
    );
  }

  /**check if two factor authentivation key is valid or not */
  if (twoFa !== customerDetails[0].pan && twoFa !== customerDetails[0].dob) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Initiate Reset Credentials-Two Factor Authentication",
      msg: "Two-factor Authentication Failed",
      username,
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
      error: customerModuleConstants.authentication.errorMessages.CIRCE005,
    });

    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE005
    );
  }

  if (
    resetMode.toUpperCase() ==
      customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD &&
    customerDetails[0].subscription_plan !=
      customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    sharedServices.error.throw(
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE006
    );
  }

  /** generate reset_request_id and set expiry for 5 mins */
  const resetRequestId = sharedServices.uuidServices.uuidV4();
  let resetRequestExpiry = moment()
    .add(sharedConstants.appConfig.app.resetRequestExpiry, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");

  /** Insert data into customer_password_reset table */
  await sharedModels.customerPasswordReset.create(
    customerDetails[0].customerId,
    resetMode,
    resetRequestId,
    resetRequestExpiry
  );

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Initiate Reset Credentials-Credentials Reset Request",
    msg: "Credentials Reset Request Generated",
    username,
    resetRequestId,
    customerId: customerDetails[0].customerId,
    customerRefId: customerDetails[0].customer_ref_id,
  });
  return { resetRequestId: resetRequestId };
};
