const registrationService = require("./registration.service");
const authenticationService = require("./authentication.service");
const validateService = require("./validate.service");

const customerModuleServices = {
    registration: registrationService,
    authentication: authenticationService,
    validate: validateService
};

module.exports = customerModuleServices;
