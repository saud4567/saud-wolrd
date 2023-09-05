const customerModel = require("./customer.model");
const customerAuthenticationModel = require("./customerAuthentication.model");
const customerBankModel = require("./customerBank.model");
const customerDpModel = require("./customerDp.model");
const customerProductModel = require("./customerProduct.model");
const customerPasswordResetModel = require("./customerPasswordReset.model");
const logModel = require("./log.model");

const sharedModels = {
  customer: customerModel,
  customerAuthentication: customerAuthenticationModel,
  customerBank: customerBankModel,
  customerDp: customerDpModel,
  customerProduct: customerProductModel,
  customerPasswordReset: customerPasswordResetModel,
  log: logModel,
};

module.exports = sharedModels;
