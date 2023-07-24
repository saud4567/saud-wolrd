const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async ({
  customerRefId,
  name,
  mobile,
  email,
  gender,
  dob,
  pan,
  aadhar,
  address,
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

  /** check if customer already exist */
  const customerDetails = await sharedModels.customer.read({ emailORmobile: { email: email, mobile: mobile } });
  
  if (customerDetails.length) {

    if (customerDetails[0].mobile == mobile) {
      sharedServices.error.throw(
        customerModuleConstants.registration.errorMessages.CRE074
      )
    }

    if (customerDetails[0].email == email) {
      sharedServices.error.throw(
        customerModuleConstants.registration.errorMessages.CRE073
      )
    }

  }
    
  /** Insert data into customers table */ 
  const customers = await sharedModels.customer.create(customerRefId,
    name,
    mobile,
    email,
    gender,
    dob,
    pan,
    aadhar,
    address,
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
    );

  
  let customerId = customers.insertId;

  /** password ,mpin and biometric encryption */
  let passwordHash = await sharedServices.authServices.getPasswordHash(password);
  let mpinHash = await sharedServices.authServices.getPasswordHash(mpin);
  let biometricHash = await sharedServices.authServices.getPasswordHash(biometric);

  /** Insert data into customer_authentication table */
  await sharedModels.customerAuthentication.create(
    customerId,
    password = passwordHash,
    mpin = mpinHash,
    biometric = biometricHash,
    pwdLastSetDate,
    mpinLastSetDate,);

  /** Prepare bulk bank account details data */  
  let bankDetailsArray = [];
  bankAccountDetails.map((b) => {
    let bankDetails = {
      "customer_id": customerId, ...b
    }
    bankDetailsArray.push(bankDetails);
  });

  /** Insert bulk data into customer_bank table  */
  await sharedModels.customerBank.createMany(
    bankDetailsArray);

  /** Prepare bulk DP details data */  
  let dpDetailsArray = [];
  dpDetails.map((d) => {
    let dpDetails = {
      "customer_id": customerId, ...d
    }
    dpDetailsArray.push(dpDetails);
  });

  /** Insert bulk data into customer_dp table  */
  await sharedModels.customerDp.createMany(
    dpDetailsArray);

  /** Prepare bulk customer product details data */  
  let productDetailsArray = [];
  productDetails.map((p) => {
    let productDetails = {
      "customer_id": customerId, ...p
    }
    productDetailsArray.push(productDetails);
  });

   /** Insert bulk data into customer_product table  */
  await sharedModels.customerProduct.createMany(
    productDetailsArray
  );


  return { customerId: customerId };
};
