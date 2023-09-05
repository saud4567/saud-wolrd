const logModels = require("shared/models/log.model");

const dbLogger = {};

dbLogger.log = async ({ customerId, action, request, response, code }) => {
  // Create a log in database
  await logModels.create(customerId, action, request, response, code);
};

module.exports = dbLogger;
