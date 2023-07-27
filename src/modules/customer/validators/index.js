const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");
const tokenValidateValidators = require("./tokenValidate.validators");

const customerModuleValidators = {
	registration: registrationValidators,
	authentication: authenticationValidators,
	tokenValidate: tokenValidateValidators,
};

module.exports = customerModuleValidators;
