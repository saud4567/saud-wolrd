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
				customerRefId:validateBody.customerRefId,	
				name: validateBody.name,
				mobile: validateBody.mobile,
				email: validateBody.email,
				gender:validateBody.gender,
				dob: validateBody.dob,
				pan: validateBody.pan,					
				address:validateBody.address,
				aadhar:validateBody.aadhar,
				fatherName:validateBody.fatherName,
				occupation:validateBody.occupation,
				annualIncome:validateBody.annualIncome,
				fatca:validateBody.fatca,
				pep:validateBody.pep,
				type:validateBody.type,
				tradingExperience:validateBody.tradingExperience,
				subscrptionPlan:validateBody.subscrptionPlan,
				brokeragePlan:validateBody.brokeragePlan,
				ddpi:validateBody.ddpi,
				disBooklet:validateBody.disBooklet,
				bsda:validateBody.bsda,
				martialStatus:validateBody.martialStatus,
				uccId:validateBody.uccId,
				rmCode:validateBody.rmCode,
				isActive:validateBody.isActive,
				password:validateBody.password,
        mpin:validateBody.mpin,
        biometric:validateBody.biometric,
        pwdLastSetDate:validateBody.pwdLastSetDate,
        mpinLastSetDate:validateBody.mpinLastSetDate,
        bankAccountDetails:validateBody.pbankAccountDetailsan,
				dpDetails:validateBody.dpDetails,
				productDetails:validateBody.productDetails
				});
				next({...customerModuleConstants.registration.messages.CRS001, result: customerDetails});
		} catch (error) {
				next(JSON.parse(error.message));
		}
};

module.exports = customerModuleControllers;
