const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = (
	req
) => {

	if (sharedValidators.isRequired(req.headers['api-key'])) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE001
		)
	}

	if (req.headers['api-key'] !== sharedConstants.appConfig.app.apiKey) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE002
		)
	}

	if (sharedValidators.isRequired(req.headers['api-secret'])) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE003
		)
	}

	if (req.headers['api-secret'] !== sharedConstants.appConfig.app.apiSecret) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE004
		)
	}

	if (sharedValidators.isRequired(req.body.customer_id)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE005
		)
	}

	if (sharedValidators.isRequired(req.body.requested_data) || req.body.requested_data.length === 0) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE006
		)
	}

	if (!sharedValidators.isArray(req.body.requested_data)) {
		sharedServices.error.throw(
			customerModuleConstants.customerDetails.errorMessages.CCDE007
		)
	}

	return {
		req
	};
};
