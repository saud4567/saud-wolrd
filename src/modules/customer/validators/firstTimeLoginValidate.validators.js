const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ username, two_fa }) => {
	if (sharedValidators.isRequired(username)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE001
		);
	}

	if (sharedValidators.isRequired(two_fa)) {
		sharedServices.error.throw(
			customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE002
		);
	}

	return {
		username,
		two_fa,
	};
};
