const express = require("express");
const commonModuleRoutes = express.Router();

const commonModuleControllers = require("./controller.js");

// route_name: encyption-decryption
// route_path: /common/encyption-decryption
// route_description:
//      route used to encrypt or Decrypt request payload
commonModuleRoutes.post(
  "/encyption-decryption",
  commonModuleControllers.encryptionDecryption
);

module.exports = commonModuleRoutes;
