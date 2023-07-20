const sharedServices = require("shared/services");
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
  isActive,
  password,
  mpin,
  biometric,
  pwdLastSetDate,
  mpinLastSetDate,
  bankAccountDetails,
  dpDetails,
  productDetails }) => {

  const customers = await sharedModels.customer.create(customerRefId,
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


   let customerId = customers.insertId;
   let passwordHash = await sharedServices.authServices.getPasswordHash(password);
   let mpinHash = await sharedServices.authServices.getPasswordHash(mpin);
   let biometricHash = await sharedServices.authServices.getPasswordHash(biometric);

  const customerAuthentication = await sharedModels.customerAuthentication.create(
    customerId,
    password = passwordHash,
    mpin = mpinHash,
    biometric = biometricHash,
    pwdLastSetDate,
    mpinLastSetDate,);


  const customerBank = await sharedModels.customerBank.createMany(
    bankAccountDetails);


  const customerDp = await sharedModels.customerDp.create(
    customerId,
    dpId,
    beneficiaryId,
    secondHolderName,
    isDefault,);


  const customerProduct = await sharedModels.customerProduct.create(
    customerId,
    productCode,
      );


  return { requestId: customerId };
};
