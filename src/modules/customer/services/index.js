const registrationService = require("./registration.service");
const authenticationService = require("./authentication.service");
const validateService = require("./validate.service");
const customerDetailsService = require("./customerDetails.service");
const changeCredentialsService = require("./changeCredentials.service");

const customerModuleServices = {
    registration: registrationService,
    authentication: authenticationService,
    validate: validateService,
    customerDetails: customerDetailsService,
    changeCredentials: changeCredentialsService
};

module.exports = customerModuleServices;
