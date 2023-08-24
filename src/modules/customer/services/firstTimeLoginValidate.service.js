const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");



module.exports = async ({ username, twoFa }) => {
	/** get customer details using username*/
	const customerDetails = await sharedModels.customer.read({ username });

	if (!customerDetails.length)
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE005
		);

	/** check if two factor authentication is valid or not */
	let isValid = false;
	if (twoFa == customerDetails[0].pan || twoFa == customerDetails[0].dob) {
		isValid = true;
	}

	return { isValid: isValid };

};
