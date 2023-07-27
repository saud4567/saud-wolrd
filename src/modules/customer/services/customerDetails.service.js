const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");


module.exports = async ({
	customerId, requestedData,
}) => {

	/** get customer details using customerId*/
	const customerDetails = await sharedModels.customer.read({ customerId });

	if (!customerDetails)
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE008
		)

	let resp = {};
	requestedData.map((rd) => {
		resp[rd] = customerDetails[0].hasOwnProperty(rd) ? customerDetails[0][rd] : '';
	});


	return resp;
};
