const express = require("express");
const appModules = express.Router();

const sampleModules = require("app_modules/sample_module/routes");
const customerModules = require("modules/customer/routes");

// module_name: sample
// module_route: /sample
// module_description:
//      handles routes related to sample module
appModules.use("/sample", sampleModules)

// module_name: customer
// module_route: /customer
// module_description:
//      handles routes related to customer module
appModules.use("/customer", customerModules)

module.exports = appModules;
