const express = require("express");
const appModules = express.Router();
const customer = require("../modules/customer/routes");

// module_name: customer
// module_route: /customer
// module_description:
//      handles routes related to customer module
appModules.use("/customer", customer);

module.exports = appModules;
