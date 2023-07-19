const customerModuleConstants = require("./constants");
const customerModuleServices = require("./services");
const customerModuleValidators = require("./validators");

const customerModuleControllers = {};

// controller_name: register
// controller_description:
//      controller used to register customer
customerModuleControllers.register = async (req, res, next) => {
		try {
			const validateBody = customerModuleValidators.registration(req.body)
	
			const customerDetails = await customerModuleServices.registration({
				customerRefId,	
				name: validateBody.name,
				mobile: validateBody.mobile,
				email: validateBody.email,
				gender,
				dob: validateBody.dob,
				panNo: validateBody.pan,					
				address,
				aadharNo,
				fatherName,
				occupation,
				annualIncome,
				fatca,
				pep,
				type,
				tradingExperience,
				subscrptionPlan,
				brokeragePlan,
				ddpi,
				disBooklet,
				bsda,
				martialStatus,
				uccId,
				rmCode,
				isActive,
				});
				next({...customerModuleConstants.registraion.messages.USAS0001, result: customerDetails});
		} catch (error) {
				next(JSON.parse(error.message));
		}
};

module.exports = customerModuleControllers;
