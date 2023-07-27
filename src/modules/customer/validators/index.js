const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");
const customerDetailsValidators = require("./customerDetails.validators");
const changeCredentialsValidators = require("./changeCredentials.validators");
const tokenValidateValidators = require("./tokenValidate.validators");

const customerModuleValidators = {
	registration: registrationValidators,
	authentication: authenticationValidators,
	customerDetails: customerDetailsValidators,
	changeCredentials: changeCredentialsValidators,
	tokenValidate: tokenValidateValidators,
};

module.exports = customerModuleValidators;
