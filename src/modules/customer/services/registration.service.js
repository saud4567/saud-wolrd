const sharedServices = require("shared/services");
const customerModuleConstants = require("../constants");
const sharedModels = require("shared/models");

module.exports = async (
  {
    customer_ref_id,
    name,
    mobile,
    email,
    gender,
    dob,
    pan,
    aadhar,
    address,
    father_name,
    occupation,
    annual_income,
    fatca,
    pep,
    customer_type,
    trading_experience,
    subscription_plan,
    brokerage_plan,
    ddpi,
    dis_booklet,
    bsda,
    marital_status,
    ucc_id,
    rm_code,
    is_active,
    password,
    mpin,
    biometric,
    bank_account_details,
    dp_details,
    product_details,
  },
  { requestId }
) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Registration- Request params",
    msg: "Request params recieved",
  });
  /** check if customer already exist */
  const customerDetails = await sharedModels.customer.read({
    email,
    mobile,
    customerRefId: customer_ref_id,
    emailORmobile: 1,
  });

  if (customerDetails.length) {
    if (customerDetails[0].customer_ref_id == customer_ref_id) {
      sharedServices.loggerServices.error.error({
        requestId,
        stage: "Customer Registration - check if customer already exist",
        msg: "Customer already exist",
        error: customerModuleConstants.registration.errorMessages.CRE077,
      });

      sharedServices.error.throw(
        customerModuleConstants.registration.errorMessages.CRE077
      );
    }

    if (customerDetails[0].email == email) {
      sharedServices.loggerServices.error.error({
        requestId,
        stage: "Customer Registration - check if customer already exist",
        msg: "Customer already exist",
        error: customerModuleConstants.registration.errorMessages.CRE073,
      });

      sharedServices.error.throw(
        customerModuleConstants.registration.errorMessages.CRE073
      );
    }

    if (customerDetails[0].mobile == mobile) {
      sharedServices.loggerServices.error.error({
        requestId,
        stage: "Customer Registration - check if customer already exist",
        msg: "Customer already exist",
        error: customerModuleConstants.registration.errorMessages.CRE074,
      });

      sharedServices.error.throw(
        customerModuleConstants.registration.errorMessages.CRE074
      );
    }
  }

  if (
    subscription_plan ==
      customerModuleConstants.registration.SUBSCRIPTION_PLAN.GOLD ||
    subscription_plan ==
      customerModuleConstants.registration.SUBSCRIPTION_PLAN.SILVER
  ) {
    customer_ref_id = sharedServices.uuidServices.uuidV4();
  }

  /** Insert data into customers table */
  const customers = await sharedModels.customer.create(
    customer_ref_id,
    name,
    mobile,
    email,
    gender,
    dob,
    pan,
    aadhar,
    address,
    father_name,
    occupation,
    annual_income,
    fatca,
    pep,
    (type = customer_type),
    trading_experience,
    subscription_plan,
    brokerage_plan,
    ddpi,
    dis_booklet,
    bsda,
    marital_status,
    ucc_id,
    rm_code,
    is_active
  );

  const customerId = customers.insertId;

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Customer Registration - New Customer",
    msg: "Customer does not exist, creating a new customer",
    customerRefId: customer_ref_id,
    customerId,
  });

  if (
    subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    /** password ,mpin and biometric encryption */
    password = await sharedServices.authServices.getPasswordHash(password);
    // mpin = await sharedServices.authServices.getPasswordHash(mpin);
    //  biometric = await sharedServices.authServices.getPasswordHash(biometric);

    /** Insert data into customer_authentication table */
    await sharedModels.customerAuthentication.create(
      customerId,
      password
      //  mpin,
      //  biometric
    );
  }

  /** Prepare bulk bank account details data */
  if (bank_account_details) {
    let bankDetailsArray = [];
    bank_account_details.map((b) => {
      let bankDetails = {
        customer_id: customerId,
        ...b,
      };
      bankDetailsArray.push(bankDetails);
    });

    /** Insert bulk data into customer_bank table  */
    await sharedModels.customerBank.createMany(bankDetailsArray);

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Customer Registration - Customer Bank Details",
      msg: "Customer Bank Details",
      customerRefId: customer_ref_id,
      customerId,
    });
  }

  if (dp_details) {
    /** Prepare bulk DP details data */
    let dpDetailsArray = [];
    dp_details.map((d) => {
      let dpDetails = {
        customer_id: customerId,
        ...d,
      };
      dpDetailsArray.push(dpDetails);
    });

    /** Insert bulk data into customer_dp table  */
    await sharedModels.customerDp.createMany(dpDetailsArray);
    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Customer Registration - Customer DP Details",
      msg: "Customer DP Details",
      customerRefId: customer_ref_id,
      customerId,
    });
  }

  if (product_details) {
    /** Prepare bulk customer product details data */
    let productDetailsArray = [];
    product_details.map((p) => {
      let productDetails = {
        customer_id: customerId,
        ...p,
      };
      productDetailsArray.push(productDetails);
    });

    /** Insert bulk data into customer_product table  */
    await sharedModels.customerProduct.createMany(productDetailsArray);
    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Customer Registration - Customer Product Details",
      msg: "Customer Product Details",
      customerRefId: customer_ref_id,
      customerId,
    });
  }

  return { customerId: customer_ref_id };
};
