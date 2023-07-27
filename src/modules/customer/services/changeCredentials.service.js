const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({
	resetMode,
	changedCredentials,
	customerRefId
}) => {

	/** check if customer already exist */
	const customerDetails = await sharedModels.customer.read({ customerRefId });

	if (!customerDetails)
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE008
		)

	let updateParams = {};
	/** password,mpin and biometric encryption */
	if (resetMode == customerModuleConstants.authentication.AUTHORIZATION_TYPE.password) {
		updateParams.password = await sharedServices.authServices.getPasswordHash(changedCredentials);
	} else if (resetMode == customerModuleConstants.authentication.AUTHORIZATION_TYPE.mpin) {
		updateParams.mpin = await sharedServices.authServices.getPasswordHash(mpin);
	} else if (resetMode == customerModuleConstants.authentication.AUTHORIZATION_TYPE.biometric) {
		updateParams.biometric = await sharedServices.authServices.getPasswordHash(biometric);
	}

	/**Update credential into customer_authentication table */
	await sharedModels.customerAuthentication.update(
		updateParams,
		{ customerId: customerDetails[0].customerId }
	);

};
