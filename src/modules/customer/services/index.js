const registrationService = require("./registration.service");
const authenticationService = require("./authentication.service");
const loginTypeService = require("./loginType.service");
const firstTimeLoginValidateService = require("./firstTimeLoginValidate.service");
const firstTimeLoginService = require("./firstTimeLogin.service");
const validateService = require("./validate.service");
const customerDetailsService = require("./customerDetails.service");
const changeCredentialsService = require("./changeCredentials.service");
const initiateResetCredentialsService = require("./initiateResetCredentials.service");
const confirmResetCredentialsService = require("./confirmResetCredentials.service");

const customerModuleServices = {
  registration: registrationService,
  authentication: authenticationService,
  loginType: loginTypeService,
  firstTimeLoginValidate: firstTimeLoginValidateService,
  firstTimeLogin: firstTimeLoginService,
  validate: validateService,
  customerDetails: customerDetailsService,
  changeCredentials: changeCredentialsService,
  initiateResetCredentials: initiateResetCredentialsService,
  confirmResetCredentials: confirmResetCredentialsService
};

module.exports = customerModuleServices;
