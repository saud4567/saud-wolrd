const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = (req) => {

	if (sharedValidators.isRequired(req.headers.authorization)) {
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE001
		)
	}

	return {
		req
	};
};
