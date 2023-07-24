const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const models = require("../models.js");

module.exports = async ({
	username,
	authorizationType,
	authorizationKey,
}) => {

	/** get customer details using username*/
	const customerDetails = await models.getCustomerDetails({ username });

	if (!customerDetails)
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE005
		)


	/** based on authorization type compare password,mpin and biometric*/
	let passwordHash;
	if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.password) {
		passwordHash = customerDetails.password;
	} else if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin) {
		passwordHash = customerDetails.mpin;
	} else if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric) {
		passwordHash = customerDetails.biometric;
	}

	const match = await sharedServices.authServices.comparePassword(authorizationKey, passwordHash);
	if (!match) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE006
		)
	}

	// generate a jwt token based on customer_id and authorization type
	const token = sharedServices.authServices.getJWT(
		{ customerId: customerDetails.customerId, authorizationType },
		sharedConstants.appConfig.app.userJWTSecret,
		{ expiresIn: sharedConstants.appConfig.app.userJWTExpiresIn }
	);


	return { token: token };
};
