const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");


module.exports = async ({
	customerRefId, requestedData,
}) => {

	/** get customer details using customerRefId*/
	let customerDetails = await sharedModels.customer.read({ customerRefId });

	if (!customerDetails)
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE008
		)

	customerDetails = customerDetails[0];

	/** get customer bank and DP details */
	const customerBank = await sharedModels.customerBank.read({ customerId: customerDetails.customerId });
	const customerDp = await sharedModels.customerDp.read({ customerId: customerDetails.customerId });

	let resp = {};
	requestedData.map((rd) => {
		if (customerDetails.hasOwnProperty(rd)) {
			resp[rd] = customerDetails.hasOwnProperty(rd) ? customerDetails[rd] : '';
		} else if (customerBank && customerBank[0].hasOwnProperty(rd)) {
			resp[rd] = customerBank.map((cb) => cb[rd]);
		} else if (customerDp && customerDp[0].hasOwnProperty(rd)) {
			resp[rd] = customerDp.map((cd) => cd[rd]);
		}

	});

	return resp;
};
