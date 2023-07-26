const registrationConstants = require("./registration.constants");
const authenticationConstants = require("./authentication.constants");
const validateConstants = require("./validate.constants");

const customerModuleConstants = {
    registration: registrationConstants,
    authentication: authenticationConstants,
    validate: validateConstants,
};

module.exports = customerModuleConstants;
