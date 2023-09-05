const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");
const tradingPlatformUpdateService = require("../../common/services/tradingPlatformUpdate.service");

module.exports = async ({
  username,
  twoFa,
  mpin,
  biometric,
  password,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer First Time Login- Request params",
    msg: "Request params recieved",
    username,
    twoFa,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer First Time Login- customer credentials",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.authentication.errorMessages.CAE005,
    });
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );
  }

  /** two factor authentication */
  if (twoFa != customerDetails[0].pan && twoFa != customerDetails[0].dob) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer First Time Login- Two Factor Authentication",
      msg: "Two-factor Authentication Failed",
      username,
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
      error: customerModuleConstants.authentication.errorMessages.CAE008,
    });

    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE008
    );
  }

  /** based on subscription_plan check mpin,biometric and password present in request body */
  if (
    customerDetails[0].subscription_plan ==
    customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    if (!password || !mpin || !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE009
      );
    }
  } else {
    if (!mpin || !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE010
      );
    }
  }

  /** password ,mpin and biometric encryption */
  if (password) {
    password = await sharedServices.authServices.getPasswordHash(password);
  }

  if (mpin) {
    mpin = await sharedServices.authServices.getPasswordHash(mpin);
  }

  if (biometric) {
    biometric = await sharedServices.authServices.getPasswordHash(biometric);
  }

  /** set JWT token expiry to midnight */
  let midnightTime = moment().add(1, "days").startOf("day");
  let jwtExpiresIn = moment(midnightTime).diff(moment(), "hours");
  if (jwtExpiresIn < 1) {
    jwtExpiresIn = moment(midnightTime).diff(moment(), "minutes") + "m";
  } else {
    jwtExpiresIn = jwtExpiresIn + "h";
  }

  // generate a jwt token based on customer_id and customer_ref_id
  const token = sharedServices.authServices.getJWT(
    {
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
    },
    sharedConstants.appConfig.app.userJWTSecret,
    { expiresIn: jwtExpiresIn }
  );

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer First Time Login- New token generate",
    msg: "Generated new token",
    customerRefId: customerDetails[0].customer_ref_id,
    customerId: customerDetails[0].customerId,
  });

  if (
    customerDetails[0].subscription_plan ==
    customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    /** Update data into customer_authentication table */
    await sharedModels.customerAuthentication.update(
      { password, mpin, biometric, token },
      {
        customerId: customerDetails[0].customerId,
      }
    );

    /**update password on trading platform */
    sharedServices.loggerServices.success.info({
      requestId,
      stage:
        "Customer First Time Login- update password/mpin on trading platform",
      msg: "Update password/mpin on trading platform",
      customerRefId: customerDetails[0].customer_ref_id,
      customerId: customerDetails[0].customerId,
    });

    const tradingPlatformUpdate = await tradingPlatformUpdateService({
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
      resetMode:
        customerModuleConstants.confirmResetCredentials.RESET_TYPE.PASSWORD,
      changedCredentials: password,
      requestId,
    });
  } else {
    /** Insert data into customer_authentication table */
    await sharedModels.customerAuthentication.create(
      customerDetails[0].customerId,
      password,
      mpin,
      biometric,
      token
    );
  }

  return { token: token };
};
