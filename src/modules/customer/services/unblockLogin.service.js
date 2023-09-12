const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({ username, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer unbolck login- Request params",
    msg: "Request params recieved",
    username,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer unbolck login - Customer Details",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.unblockLogin.errorMessages.CULE002,
    });
    sharedServices.error.throw(
      customerModuleConstants.unblockLogin.errorMessages.CULE002
    );
  }

  /** get customer authentication data */
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  if (!customerAuthentication.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer unbolck login - Customer Credentials Not Set",
      msg: "Customer Credentials Not Set",
      username,
      customerId: customerDetails[0].customerId,
      error: customerModuleConstants.unblockLogin.errorMessages.CULE003,
    });
    sharedServices.error.throw(
      customerModuleConstants.unblockLogin.errorMessages.CULE003
    );
  }

  /** update isLoginBlocked and failedLoginAttempt inauthentication tbl */
  await sharedModels.customerAuthentication.update(
    { failedLoginAttempt: 0, isLoginBlocked: 0 },
    {
      customerId: customerDetails[0].customerId,
    }
  );
};
