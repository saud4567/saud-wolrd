const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");

module.exports = async ({ username, mpin, biometric, password, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Authentication- Request params",
    msg: "Request params recieved",
    username,
  });
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Authentication - Customer Credentials",
      msg: "Credentials does not match",
      username,
      error: customerModuleConstants.authentication.errorMessages.CAE005,
    });
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );
  }

  if (
    customerDetails[0].subscription_plan ==
    customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    if (!password && !mpin && !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE014
      );
    }
  } else {
    if (!mpin && !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE015
      );
    }
  }

  /** get customer authentication data */
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  if (!customerAuthentication.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Authentication - Customer Credentials Not Set",
      msg: "Customer Credentials Not Set",
      username,
      customerId: customerDetails[0].customerId,
      error: customerModuleConstants.authentication.errorMessages.CAE016,
    });
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE016
    );
  }

  /** check if is_login_blocked is set or not */
  if (customerAuthentication[0].is_login_blocked == 1) {
    let loginBlockedHrs = moment().diff(
      customerAuthentication[0].last_failed_login_date,
      "hours"
    );
    if (loginBlockedHrs >= sharedConstants.appConfig.app.loginBlockedTime) {
      await sharedModels.customerAuthentication.update(
        { failedLoginAttempt: 0, isLoginBlocked: 0 },
        {
          customerId: customerDetails[0].customerId,
        }
      );
    } else {
      sharedServices.loggerServices.error.error({
        requestId,
        stage: "Customer Authentication - Login Blocked",
        msg: "Customer Login Is Blocked",
        username,
        customerId: customerDetails[0].customerId,
        error: customerModuleConstants.authentication.errorMessages.CAE012,
      });
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE012
      );
    }
  }

  /** based on subscription_plan compare mpin,biometric or password */
  let passwordHash;
  let authorizationKey;
  if (password) {
    passwordHash = customerAuthentication[0].password;
    authorizationKey = password;
  } else if (mpin) {
    passwordHash = customerAuthentication[0].mpin;
    authorizationKey = mpin;
  } else if (biometric) {
    passwordHash = customerAuthentication[0].biometric;
    authorizationKey = biometric;
  }

  /**compare credentials */
  const match = await sharedServices.authServices.comparePassword(
    authorizationKey,
    passwordHash
  );

  if (match) {
    /** check if previous token is valid or not */
    try {
      if (customerAuthentication[0].token) {
        const isValid = sharedServices.authServices.validateJWT(
          customerAuthentication[0].token,
          sharedConstants.appConfig.app.userJWTSecret
        );
        if (isValid) {
          await sharedModels.customerAuthentication.update(
            { failedLoginAttempt: 0, isLoginBlocked: 0 },
            {
              customerId: customerDetails[0].customerId,
            }
          );
          return { token: customerAuthentication[0].token };
        }
      }
    } catch (error) {
      sharedServices.loggerServices.error.error({
        requestId,
        stage: "Customer Authentication - Check previous token",
        msg: "Customer Previous Token Not Valid",
        username,
        customerId: customerDetails[0].customerId,
      });
    }

    /** if previous token is not valid then generate new token */
    /** set JWT token expiry to midnight */
    let midnightTime = moment().add(1, "days").startOf("day");
    let jwtExpiresIn = moment(midnightTime).diff(moment(), "hours");
    if (jwtExpiresIn < 1) {
      jwtExpiresIn = moment(midnightTime).diff(moment(), "minutes") + "m";
    } else {
      jwtExpiresIn = jwtExpiresIn + "h";
    }

    // generate a jwt token based on customer_id and customerRefId
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
      stage: "Customer Authentication- Generate New Token",
      msg: "Generated new token",
      customerRefId: customerDetails[0].customer_ref_id,
      customerId: customerDetails[0].customerId,
    });

    /**Update credential into customer_authentication table */
    await sharedModels.customerAuthentication.update(
      { token, failedLoginAttempt: 0, isLoginBlocked: 0 },
      {
        customerId: customerDetails[0].customerId,
      }
    );
    return { token: token };
  } else {
    /** get customer authentication data */
    const customerAuthentication =
      await sharedModels.customerAuthentication.read({
        customerId: customerDetails[0].customerId,
      });

    /**Update login attempt failed count into customer_authentication table */
    let updateParams = {};
    updateParams.failedLoginAttempt =
      parseInt(customerAuthentication[0].failed_login_attempt) + 1;
    updateParams.lastFailedLoginDate = moment().format("YYYY-MM-DD HH:mm:ss");

    if (
      updateParams.failedLoginAttempt ==
      sharedConstants.appConfig.app.failedLoginAttemptLimit
    ) {
      updateParams.isLoginBlocked = 1;
    }

    await sharedModels.customerAuthentication.update(updateParams, {
      customerId: customerDetails[0].customerId,
    });

    let remainingLoginAttempts =
      parseInt(sharedConstants.appConfig.app.failedLoginAttemptLimit) -
      parseInt(updateParams.failedLoginAttempt);

    let errorMsg = {
      code: "CAE011",
      statusCode: "400",
      message: "",
    };

    errorMsg.message =
      customerModuleConstants.authentication.errorMessages.CAE011.message;
    errorMsg.message = errorMsg.message.replace(
      "<number>",
      remainingLoginAttempts
    );

    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Customer Authentication - Customer Credentials",
      msg: "Credentials does not match",
      username,
      customerId: customerDetails[0].customerId,
      error: errorMsg.message,
    });

    sharedServices.error.throw(errorMsg);
  }
};
