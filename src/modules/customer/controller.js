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

		/** handle logic within service function */
		const customerDetails = await customerModuleServices.registration(validateBody.body);

		/**return response */
		next({ ...customerModuleConstants.registration.messages.CRS001, result: customerDetails });

	} catch (error) {
		next(JSON.parse(error.message));
	}
};


// controller_name: authenticate
// controller_description:
//      controller used to authenticate customer and generate token
customerModuleControllers.authenticate = async (req, res, next) => {
	try {
		/** Validation of request data */
		const validateBody = customerModuleValidators.authentication(req.body)

		/** handle logic within service function */
		const customerDetails = await customerModuleServices.authentication({
			username: validateBody.username,
			authorizationType: validateBody.authorization_type,
			authorizationKey: validateBody.authorization_key,
		});

		/**return response */
		next({ ...customerModuleConstants.authentication.messages.CAS001, result: customerDetails });
	} catch (error) {
		next(JSON.parse(error.message));
	}
}

// controller_name: validate
// controller_description:
//      controller used to validate token
customerModuleControllers.validate = async (req, res, next) => {
	try {

		/** Validation of request data */
		const validateBody = customerModuleValidators.tokenValidate(req);

		/** handle logic within service function */
		const validateToken = await customerModuleServices.validate({ token: req.headers.authorization });

		/**return response */
		return next({ ...customerModuleConstants.validate.messages.CVS001, result: validateToken });

	} catch (error) {
		next(JSON.parse(error.message));
	}
};

// controller_name: customerDetails
// controller_description:
//      controller used to get customer details
customerModuleControllers.customerDetails = async (req, res, next) => {
	try {
		/** Validation of request data */
		const validateBody = customerModuleValidators.customerDetails(req)

		/** handle logic within service function */
		const customerDetails = await customerModuleServices.customerDetails({
			customerRefId: validateBody.req.body.customer_id,
			requestedData: validateBody.req.body.requested_data,
		});

		/**return response */
		next({ ...customerModuleConstants.customerDetails.messages.CCDS001, result: customerDetails });
	} catch (error) {
		next(JSON.parse(error.message));
	}
}

// controller_name: changeCredentials
// controller_description:
//      controller used to change the credentials of customer
customerModuleControllers.changeCredentials = async (req, res, next) => {
	try {
		/** Validation of request data */
		const validateBody = customerModuleValidators.changeCredentials(req.body);
		/** handle logic within service function */
		const changeCredentials = await customerModuleServices.changeCredentials({
			resetMode: validateBody.reset_mode,
			changedCredentials: validateBody.changed_credentials,
			customerRefId: req.customerRefId
		});

		/**return response */
		return next({ ...customerModuleConstants.changeCredentials.messages.CCCS001, result: "" });

	} catch (error) {
		next(JSON.parse(error.message));
	}
};

module.exports = customerModuleControllers;
