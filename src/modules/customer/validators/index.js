const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");
const loginTypeValidators = require("./loginType.validators");
const firstTimeLoginValidateValidators = require("./firstTimeLoginValidate.validators");
const firstTimeLoginValidators = require("./firstTimeLogin.validators");
const customerDetailsValidators = require("./customerDetails.validators");
const changeCredentialsValidators = require("./changeCredentials.validators");
const tokenValidateValidators = require("./tokenValidate.validators");
const initiateResetCredentialsValidators = require("./initiateResetCredentials.validators");
const confirmResetCredentialsValidators = require("./confirmResetCredentials.validators");
const unblockLoginValidators = require("./unblockLogin.validators");

const customerModuleValidators = {
  registration: registrationValidators,
  authentication: authenticationValidators,
  loginType: loginTypeValidators,
  firstTimeLoginValidate: firstTimeLoginValidateValidators,
  firstTimeLogin: firstTimeLoginValidators,
  customerDetails: customerDetailsValidators,
  changeCredentials: changeCredentialsValidators,
  tokenValidate: tokenValidateValidators,
  initiateResetCredentials: initiateResetCredentialsValidators,
  confirmResetCredentials: confirmResetCredentialsValidators,
  unblockLogin: unblockLoginValidators,
};

module.exports = customerModuleValidators;
