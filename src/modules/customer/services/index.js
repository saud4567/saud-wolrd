const registrationService = require("./registration.service");
const authenticationService = require("./authentication.service");

const customerModuleServices = {
    registration: registrationService,
    authentication: authenticationService,
};

module.exports = customerModuleServices;
