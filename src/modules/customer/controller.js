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
		const validateBody = customerModuleValidators.registration(req.body)

		/** handle logic within service function */
		const customerDetails = await customerModuleServices.registration({
			customerRefId: validateBody.customer_id,
			name: validateBody.name,
			mobile: validateBody.mobile,
			email: validateBody.email,
			gender: validateBody.gender,
			dob: validateBody.dob,
			pan: validateBody.pan,
			aadhar: validateBody.aadhar,
			address: validateBody.address,
			fatherName: validateBody.father_name,
			occupation: validateBody.occupation,
			annualIncome: validateBody.annual_income,
			fatca: validateBody.fatca,
			pep: validateBody.pep,
			type: validateBody.customer_type,
			tradingExperience: validateBody.trading_experience,
			subscriptionPlan: validateBody.subscription_plan,
			brokeragePlan: validateBody.brokerage_plan,
			ddpi: validateBody.ddpi,
			disBooklet: validateBody.dis_booklet,
			bsda: validateBody.bsda,
			martialStatus: validateBody.martial_status,
			uccId: validateBody.ucc_id,
			rmCode: validateBody.rm_code,
			isActive: validateBody.is_active,
			password: validateBody.password,
			mpin: validateBody.mpin,
			biometric: validateBody.biometric,
			pwdLastSetDate: validateBody.pwd_last_set_date,
			mpinLastSetDate: validateBody.mpin_last_set_date,
			bankAccountDetails: validateBody.bank_account_details,
			dpDetails: validateBody.dp_details,
			productDetails: validateBody.product_details
		});

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
};

module.exports = customerModuleControllers;
