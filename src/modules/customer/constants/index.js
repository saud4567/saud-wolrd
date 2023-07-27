const registrationConstants = require("./registration.constants");
const authenticationConstants = require("./authentication.constants");
const validateConstants = require("./validate.constants");
const customerDetailsConstants = require("./customerDetails.constants");
const changeCredentialsConstants = require("./changeCredentials.constants");
const initiateResetCredentialsConstants = require("./initiateResetCredentials.constants");
const confirmResetCredentialsConstants = require("./confirmResetCredentials.constants");

const customerModuleConstants = {
    registration: registrationConstants,
    authentication: authenticationConstants,
    validate: validateConstants,
    customerDetails: customerDetailsConstants,
    changeCredentials: changeCredentialsConstants,
    initiateResetCredentials: initiateResetCredentialsConstants,
    confirmResetCredentials: confirmResetCredentialsConstants
};

module.exports = customerModuleConstants;
