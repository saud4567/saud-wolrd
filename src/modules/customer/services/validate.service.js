const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");


module.exports = async ({
	token
}) => {

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
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE002
		)
	} catch (error) {
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE002
		)
	}
};
