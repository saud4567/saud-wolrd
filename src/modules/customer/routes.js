const express = require("express");
const sharedConstants = require("shared/middlewares");
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

// route_name: validate
// route_path: /customer/validate
// route_description:
//      route used to validate token
customerModuleRoutes.get("/validate", customerModuleControllers.validate);

// route_name: info
// route_path: /customer/info
// route_description:
//      route used to validate token
customerModuleRoutes.get("/info", customerModuleControllers.customerDetails);

// route_name: change-credentials
// route_path: /customer/change-credentials
// route_description:
//      route used to change the credentials of customers
customerModuleRoutes.post("/change-credentials", sharedConstants.authMiddleware, customerModuleControllers.changeCredentials);

module.exports = customerModuleRoutes;
