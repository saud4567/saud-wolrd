const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");


module.exports = async ({ username, mpin, biometric, password }) => {
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  /** get customer authentication data */
  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  if (!customerAuthentication.length)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  /** check if previous session_id is valid or not */
  try {
    if (customerAuthentication[0].session_id) {
      const isValid = sharedServices.authServices.validateJWT(
        customerAuthentication[0].session_id,
        sharedConstants.appConfig.app.userJWTSecret
      );
      if (isValid) {
        return { token: customerAuthentication[0].session_id };
      }
    }
  } catch (error) {

  }

  /** if previous session_id is not valid then generate new session_id */
  if (customerDetails[0].subscription_plan ==
    customerModuleConstants.authentication.SUBSCRIPTION_PLAN.PLATINUM) {
    if (!password && !mpin && !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE009
      );
    }
  } else {
    if (!mpin && !biometric) {
      sharedServices.error.throw(
        customerModuleConstants.authentication.errorMessages.CAE010
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
    /** set JWT token expiry to midnight */
    let midnightTime = moment().add(1, 'days').startOf('day');
    let jwtExpiresIn = moment(midnightTime).diff(moment(), "hours");

    // generate a jwt token based on customer_id and customerRefId
    const token = sharedServices.authServices.getJWT(
      {
        customerId: customerDetails[0].customerId,
        customerRefId: customerDetails[0].customer_ref_id,
      },
      sharedConstants.appConfig.app.userJWTSecret,
      { expiresIn: jwtExpiresIn + "h" }
    );

    /**Update credential into customer_authentication table */
    await sharedModels.customerAuthentication.update({ sessionId: token }, {
      customerId: customerDetails[0].customerId,
    });

    return { token: token };
  } else {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE011
    );
  }

};
