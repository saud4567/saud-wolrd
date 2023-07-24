const customerModuleConstants = require("./constants");
const customerModuleServices = require("./services");
const customerModuleValidators = require("./validators");

const customerModuleControllers = {};

// controller_name: register
// controller_description:
//      controller used to register customer
customerModuleControllers.register = async (req, res, next) => {
	try {
		/** Validation of request data */
		const validateBody = customerModuleValidators.registration(req.body);

		if (Array.isArray(validateBody) && validateBody.length) {
			/** return bulk error response */
			next({ "statusCode": 400, "message": validateBody });
		} else {
			/** handle logic within service function */
			const customerDetails = await customerModuleServices.registration(validateBody.body);

			/**return response */
			next({ ...customerModuleConstants.registration.messages.CRS001, result: customerDetails });
		}
	} catch (error) {
		next(JSON.parse(error.message));
	}
};

module.exports = customerModuleControllers;
