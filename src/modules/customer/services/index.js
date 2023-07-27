const registrationService = require("./registration.service");
const authenticationService = require("./authentication.service");
const validateService = require("./validate.service");
const customerDetailsService = require("./customerDetails.service");
const changeCredentialsService = require("./changeCredentials.service");
const initiateResetCredentialsService = require("./initiateResetCredentials.service");
const confirmResetCredentialsService = require("./confirmResetCredentials.service");

const customerModuleServices = {
    registration: registrationService,
    authentication: authenticationService,
    validate: validateService,
    customerDetails: customerDetailsService,
    changeCredentials: changeCredentialsService,
    initiateResetCredentials: initiateResetCredentialsService,
    confirmResetCredentials: confirmResetCredentialsService
};

module.exports = customerModuleServices;
