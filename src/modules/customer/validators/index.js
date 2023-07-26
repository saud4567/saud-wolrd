const registrationValidators = require("./registration.validators");
const authenticationValidators = require("./authentication.validators");
const customerDetailsValidators = require("./customerDetails.validators");

const customerModuleValidators = {
	registration: registrationValidators,
	authentication: authenticationValidators,
	customerDetails: customerDetailsValidators,
};

module.exports = customerModuleValidators;
