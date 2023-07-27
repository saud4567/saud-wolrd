const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");
const moment = require("moment");


module.exports = async ({
	username,
	twoFa,
	resetMode
}) => {

	/** get customer details using username*/
	const customerDetails = await sharedModels.customer.read({ username });

	if (!customerDetails.length) {
		sharedServices.error.throw(
			customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE004
		)
	}

	if (twoFa !== customerDetails[0].pan && twoFa !== customerDetails[0].dob) {
		sharedServices.error.throw(
			customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE005
		)

	}

	const resetRequestId = sharedServices.uuidServices.uuidV4();
	let resetRequestExpiry = moment(new Date()).add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

	/** Insert data into customer_password_reset table */
	await sharedModels.customerPasswordReset.create(
		customerDetails[0].customerId,
		resetMode,
		resetRequestId,
		resetRequestExpiry,
	);


	return { resetRequestId: resetRequestId };
};
