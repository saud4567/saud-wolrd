const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ customerRefId,
	name,
	mobile,
	email,
	gender,
	dob,
	panNo,
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
	isActive, }) => {

	if (sharedValidators.isRequired(name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.SAME0001
		)
	}
	if (!sharedValidators.isValidName(name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0002
		)
	}
	if (sharedValidators.isRequired(email)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0003
		)
	}
	if (!sharedValidators.isValidEmail(email)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0004
		)
	}

	if (sharedValidators.isRequired(mobile)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0006
		)
	}
	if (!sharedValidators.isvalidMobileNumber(mobile)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0007
		)
	}
	if (sharedValidators.isRequired(panNo)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0008
		)
	}
	if (!sharedValidators.isValidPan(panNo)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.USAE0009
		)
	}

	return {
	customerRefId,
	name,
	mobile,
	email,
	gender,
	dob,
	panNo,
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
	isActive
	};
};
