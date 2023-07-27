const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");
const customerDetailsValidators = require("./customerDetails.validators");
const changeCredentialsValidators = require("./changeCredentials.validators");
const tokenValidateValidators = require("./tokenValidate.validators");
const initiateResetCredentialsValidators = require("./initiateResetCredentials.validators");
const confirmResetCredentialsValidators = require("./confirmResetCredentials.validators");

const customerModuleValidators = {
	registration: registrationValidators,
	authentication: authenticationValidators,
	customerDetails: customerDetailsValidators,
	changeCredentials: changeCredentialsValidators,
	tokenValidate: tokenValidateValidators,
	initiateResetCredentials: initiateResetCredentialsValidators,
	confirmResetCredentials: confirmResetCredentialsValidators,
};

module.exports = customerModuleValidators;
