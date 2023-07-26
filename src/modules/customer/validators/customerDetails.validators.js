const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = ({
	apiKey,
	apiSecret,
	customer_id,
	requested_data,
}) => {

	if (sharedValidators.isRequired(apiKey)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE001
		)
	}

	if (apiKey !== sharedConstants.appConfig.app.apiKey) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE002
		)
	}

	if (sharedValidators.isRequired(apiSecret)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE003
		)
	}

	if (apiSecret !== sharedConstants.appConfig.app.apiSecret) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE004
		)
	}

	if (sharedValidators.isRequired(customer_id)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE005
		)
	}

	if (sharedValidators.isRequired(requested_data) || requested_data.length === 0) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE006
		)
	}

	if (!sharedValidators.isArray(requested_data)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE007
		)
	}

	return {
		apiKey,
		apiSecret,
		customer_id,
		requested_data,
	};
};
