const express = require("express");
const customerModuleRoutes = express.Router();

const customerModuleControllers = require("./controller.js");

// route_name: register
// route_path: /customer/register
// route_description:
//      route used to register customer
customerModuleRoutes.post("/register", customerModuleControllers.register);

// route_name: authenticate
// route_path: /customer/authenticate
// route_description:
//      route used to authenticate customer
customerModuleRoutes.post("/authenticate", customerModuleControllers.authenticate);

module.exports = customerModuleRoutes;
