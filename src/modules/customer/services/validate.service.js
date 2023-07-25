const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");
const sharedModels = require("shared/models");

module.exports = async ({
	token
}) => {

	if (!token) {
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE001
		)
	}
	try {
		const isValid = sharedServices.authServices.validateJWT(
			token,
			sharedConstants.appConfig.app.userJWTSecret,
		);
		if (isValid) {
			return {
				"isValid": true
			}
		}
		return {
			"isValid": false
		}
	} catch (error) {
		return {
			"isValid": false
		}
	}
};
