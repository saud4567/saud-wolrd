const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");

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

  // if (!customerAuthentication.length)
  //   sharedServices.error.throw(
  //     customerModuleConstants.authentication.errorMessages.CAE005
  //   );

  /** based on authorization type compare password,mpin and biometric*/
  let passwordHash;
  if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.password
  ) {
    if (authorizationKey != 'Password@123') {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE006
    );
  }
  } else if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin
  ) {
    if (authorizationKey != '12341234') {
    sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE006
    );
  }
  } else if (
    authorizationType ==
    customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric
  ) {
    if (authorizationKey != 'ABCD1234') {
      sharedServices.error.throw(
      customerModuleConstants.authentication.errorMessages.CAE006
      );
    }
  }

  // const match = await sharedServices.authServices.comparePassword(
  //   authorizationKey,
  //   passwordHash
  // );
  

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

  return { token: token };
};
