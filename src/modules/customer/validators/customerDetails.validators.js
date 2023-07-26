const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({
	customer_id,
	requested_data,
}) => {

	if (sharedValidators.isRequired(customer_id)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE002
		)
	}

	if (sharedValidators.isRequired(requested_data) || requested_data.length === 0) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE003
		)
	}

	if (!sharedValidators.isArray(requested_data)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE004
		)
	}

	return {
		customer_id,
		requested_data,
	};
};
