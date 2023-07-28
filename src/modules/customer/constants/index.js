const registrationConstants = require("./registration.constants");
const authenticationConstants = require("./authentication.constants");
const validateConstants = require("./validate.constants");
const customerDetailsConstants = require("./customerDetails.constants");

const customerModuleConstants = {
    registration: registrationConstants,
    authentication: authenticationConstants,
    validate: validateConstants,
    customerDetails: customerDetailsConstants
};

module.exports = customerModuleConstants;
