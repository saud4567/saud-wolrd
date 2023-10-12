const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ username, two_fa, mpin, biometric, password }) => {
	if (sharedValidators.isRequired(username)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE001
		);
	}

	if (sharedValidators.isRequired(two_fa)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE007
		);
	}

	if (sharedValidators.isRequired(mpin) && sharedValidators.isRequired(biometric) && sharedValidators.isRequired(password)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE009
		);
	}

	return {
		username,
		two_fa,
		mpin,
		biometric,
		password
	};
};
