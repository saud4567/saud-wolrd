const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({
	username,
	authorization_type,
	authorization_key,
}) => {

	if (sharedValidators.isRequired(username)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE001
		)
	}

	if (sharedValidators.isRequired(authorization_type)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE002
		)
	}

	if (!customerModuleConstants.authentication.AUTHORIZATION_TYPE.hasOwnProperty(authorization_type)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE003
		)
	}

	if (sharedValidators.isRequired(authorization_key)) {
		sharedServices.error.throw(
			customerModuleConstants.authentication.errorMessages.CAE004
		)
	}

	return {
		username,
		authorization_type,
		authorization_key,
	};
};
