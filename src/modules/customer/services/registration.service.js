const mysqlHelpers = require("shared/services");
const sharedConstants = require("shared/constants");
const sharedModels = require("shared/models");

module.exports = async ({ 
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
	isActive }) => {
 
  const customerId = await sharedModels.customer.create( customerRefId,
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
    isActive);


  return { requestId: customerId };
};
