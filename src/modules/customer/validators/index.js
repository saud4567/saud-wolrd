const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");

const customerModuleValidators = {
	registration: registrationValidators,
	authentication: authenticationValidators,
};

module.exports = customerModuleValidators;
