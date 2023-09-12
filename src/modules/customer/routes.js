const express = require("express");
const sharedConstants = require("shared/middlewares");
const customerModuleRoutes = express.Router();

const customerModuleControllers = require("./controller.js");

// route_name: register
// route_path: /customer/register
// route_description:
//      route used to register customer
customerModuleRoutes.post("/register", customerModuleControllers.register);

// route_name: login-type
// route_path: /customer/login-type
// route_description:
//      route used to get customer login type
customerModuleRoutes.post("/login-type", customerModuleControllers.loginType);

// route_name: first-login-validate
// route_path: /customer/first-login-validate
// route_description:
//      route used to validate customer for first time login
customerModuleRoutes.post(
  "/first-login-validate",
  customerModuleControllers.firstTimeLoginValidate
);

// route_name: first-login
// route_path: /customer/first-login
// route_description:
//      route used to login for first time
customerModuleRoutes.post(
  "/first-login",
  customerModuleControllers.firstTimeLogin
);

// route_name: authenticate
// route_path: /customer/authenticate
// route_description:
//      route used to authenticate customer
customerModuleRoutes.post(
  "/authenticate",
  customerModuleControllers.authenticate
);

// route_name: validate
// route_path: /customer/validate
// route_description:
//      route used to validate token
customerModuleRoutes.get("/validate", customerModuleControllers.validate);

// route_name: info
// route_path: /customer/info
// route_description:
//      route used to validate token
customerModuleRoutes.post("/info", customerModuleControllers.customerDetails);

// route_name: change-credentials
// route_path: /customer/change-credentials
// route_description:
//      route used to change the credentials of customers
customerModuleRoutes.post(
  "/change-credentials",
  sharedConstants.authMiddleware,
  customerModuleControllers.changeCredentials
);

// route_name: initiate-reset
// route_path: /customer/initiate-reset
// route_description:
//      route used to initiate the process for resetting the credentials of customer
customerModuleRoutes.post(
  "/initiate-reset",
  customerModuleControllers.initiateResetCredentials
);

// route_name: confirm-reset
// route_path: /customer/confirm-reset
// route_description:
//      route used to reset credentials of customer
customerModuleRoutes.post(
  "/confirm-reset",
  customerModuleControllers.confirmResetCredentials
);

// route_name: unblock-login
// route_path: /customer/unblock-login
// route_description:
//      route used to unblock login of customer
customerModuleRoutes.post(
  "/unblock-login",
  customerModuleControllers.unblockLogin
);
module.exports = customerModuleRoutes;
