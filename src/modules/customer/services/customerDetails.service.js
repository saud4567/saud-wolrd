const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const customerModuleParsers = require("../parsers");

module.exports = async ({ token, customerRefId, requestedData, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Info- Request params",
    msg: "Request params recieved",
  });
  if (token) {
    /** check if token is valid or not */
    const isValid = sharedServices.authServices.validateJWT(
      token,
      sharedConstants.appConfig.app.userJWTSecret
    );
    if (isValid) {
      customerRefId = isValid.customerRefId;
      sharedServices.loggerServices.success.info({
        requestId,
        stage: "Customer Info- validate token",
        msg: "token validate successfully",
        customerRefId,
      });
    }
  }
  /** get customer details using customerRefId*/
  let customerDetails = await sharedModels.customer.read({ customerRefId });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Info - Customer Details",
      msg: "Customer Details Not Found",
      customerRefId,
      error: customerModuleConstants.customerDetails.errorMessages.CCDE008,
    });
    sharedServices.error.throw(
      customerModuleConstants.customerDetails.errorMessages.CCDE008
    );
  }

  customerDetails = customerDetails[0];

  let whereParams = {
    customerId: customerDetails.customerId,
  };
  if (!token) {
    whereParams.isDefault = 1;
  }

  /** get customer bank and DP details */
  const customerBank = await sharedModels.customerBank.read(whereParams);
  const customerDp = await sharedModels.customerDp.read(whereParams);

  let resp = {};
  if (!token) {
    requestedData.map((rd) => {
      if (customerDetails.hasOwnProperty(rd)) {
        resp[rd] = customerDetails.hasOwnProperty(rd)
          ? customerDetails[rd]
          : "";
      } else if (customerBank && customerBank[0].hasOwnProperty(rd)) {
        //resp[rd] = customerBank.map((cb) => {cb[rd]});
        if (!resp.hasOwnProperty("bank_details")) {
          resp.bank_details = [];
        }

        for (bank of customerBank) {
          if (typeof resp["bank_details"][bank.id] !== "undefined") {
            resp["bank_details"][bank.id][rd] = bank[rd];
          } else {
            resp["bank_details"][bank.id] = {};
            resp["bank_details"][bank.id][rd] = bank[rd];
          }
        }
      } else if (customerDp && customerDp[0].hasOwnProperty(rd)) {
        // resp[rd] = customerDp.map((cd) => cd[rd]);
        if (!resp.hasOwnProperty("dp_details")) {
          resp.dp_details = [];
        }
        for (dp of customerDp) {
          if (typeof resp["dp_details"][dp.id] !== "undefined") {
            resp["dp_details"][dp.id][rd] = dp[rd];
          } else {
            resp["dp_details"][dp.id] = {};
            resp["dp_details"][dp.id][rd] = dp[rd];
          }
        }
      }
    });

    if (resp.hasOwnProperty("bank_details")) {
      resp["bank_details"] = resp["bank_details"].filter((bank) => bank);
    }
    if (resp.hasOwnProperty("dp_details")) {
      resp["dp_details"] = resp["dp_details"].filter((dp) => dp);
    }
  } else {
    resp = customerModuleParsers.customerDetails({
      customerDetails,
      customerBank,
      customerDp,
    });
  }

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Info",
    msg: "Customer information",
    customerRefId,
    customerInfo: resp,
  });
  return resp;
};
