const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");
const encryptionServices = require("shared/services/encryption.services");

module.exports = async ({ username, authorizationType, authorizationKey }) => {
  /** get customer details using username*/
  const customerDetails = await sharedModels.customer.read({ username });

  if (!customerDetails.length)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  const customerAuthentication = await sharedModels.customerAuthentication.read(
    { customerId: customerDetails[0].customerId }
  );

  if (!customerAuthentication)
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE005
    );

  /** based on authorization type compare password,mpin and biometric*/
  let passwordHash;
  if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.password
  ) {
    passwordHash = customerAuthentication[0].password;
  } else if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin
  ) {
    passwordHash = customerAuthentication[0].mpin;
  } else if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric
  ) {
    passwordHash = customerAuthentication[0].biometric;
  }

  const match = await sharedServices.authServices.comparePassword(
    authorizationKey,
    passwordHash
  );
  if (!match) {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE006
    );
  }

  /** set JWT token expiry to midnight */
  let midnightTime = moment().startOf("day");
  let jwtExpiresIn = moment().diff(midnightTime, "hours");

  // generate a jwt token based on customer_id and customerRefId
  const token = sharedServices.authServices.getJWT(
    {
      customerId: customerDetails[0].customerId,
      customerRefId: customerDetails[0].customer_ref_id,
    },
    sharedConstants.appConfig.app.userJWTSecret,
    { expiresIn: jwtExpiresIn + "h" }
  );

  /**encrypt response */
  const encyptedResponse = await encryptionServices.encryptUsingRsaAlgorithm(JSON.stringify({ token: token }));

  return encyptedResponse;

};
