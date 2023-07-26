const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");


module.exports = async ({
	username,
	authorizationType,
	authorizationKey,
}) => {

	/** get customer details using username*/
	const customerDetails = await sharedModels.customer.read({ username });

	if (!customerDetails)
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE005
		)

	const customerAuthentication = await sharedModels.customerAuthentication.read({ customerId: customerDetails[0].customerId });

	if (!customerAuthentication)
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE005
		)

	/** based on authorization type compare password,mpin and biometric*/
	let passwordHash;
	if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.password) {
		passwordHash = customerAuthentication[0].password;
	} else if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin) {
		passwordHash = customerAuthentication[0].mpin;
	} else if (authorizationType == customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric) {
		passwordHash = customerAuthentication[0].biometric;
	}

	const match = await sharedServices.authServices.comparePassword(authorizationKey, passwordHash);
	if (!match) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE006
		)
	}

	// generate a jwt token based on customer_id and customerRefId
	const token = sharedServices.authServices.getJWT(
		{
			customerId: customerDetails[0].customerId,
			customerRefId: customerDetails[0].customerRefId
		},
		sharedConstants.appConfig.app.userJWTSecret,
		{ expiresIn: sharedConstants.appConfig.app.userJWTExpiresIn }
	);


	return { token: token };
};
