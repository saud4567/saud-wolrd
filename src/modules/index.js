const express = require("express");
const appModules = express.Router();
const customer = require("../modules/customer/routes");
const common = require("../modules/common/routes");

// module_name: customer
// module_route: /customer
// module_description:
//      handles routes related to customer module
appModules.use("/customer", customer);

// module_name: common
// module_route: /common
// module_description:
//      handles routes related to common module
appModules.use("/common", common);

module.exports = appModules;
