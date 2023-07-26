const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");


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
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE001
		)
	} catch (error) {
		sharedServices.error.throw(
			customerModuleConstants.validate.errorMessages.CVE001
		)
	}
};
