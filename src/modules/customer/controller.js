const customerModuleConstants = require("./constants");
const customerModuleServices = require("./services");
const customerModuleValidators = require("./validators");

const customerModuleControllers = {};

// controller_name: register
// controller_description:
//      controller used to register customer
customerModuleControllers.register = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.registration(req.body);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.registration(
      validateBody.body
    );

    /**return response */
    next({
      ...customerModuleConstants.registration.messages.CRS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: authenticate
// controller_description:
//      controller used to authenticate customer and generate token
customerModuleControllers.authenticate = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.authentication(req.body);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.authentication({
      username: validateBody.username,
      authorizationType: validateBody.authorization_type,
      authorizationKey: validateBody.authorization_key,
    });

    /**return response */
    next({
      ...customerModuleConstants.authentication.messages.CAS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: validate
// controller_description:
//      controller used to validate token
customerModuleControllers.validate = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.tokenValidate(req.headers);

    /** handle logic within service function */
    const validateToken = await customerModuleServices.validate({
      token: validateBody.authorization,
    });

    /**return response */
    return next({
      ...customerModuleConstants.validate.messages.CVS001,
      result: validateToken,
    });
  } catch (error) {
    if (
      error.name == customerModuleConstants.validate.JsonWebTokenError ||
      error.name == customerModuleConstants.validate.tokenExpiredError
    ) {
      next({
        ...customerModuleConstants.validate.errorMessages.CVE002,
        result: { isValid: false },
      });
    } else {
      next(JSON.parse(error.message));
    }
  }
};

// controller_name: customerDetails
// controller_description:
//      controller used to get customer details
customerModuleControllers.customerDetails = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.customerDetails(req);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.customerDetails({
      customerRefId: validateBody.customerId,
      requestedData: validateBody.requestedData,
    });

    /**return response */
    next({
      ...customerModuleConstants.customerDetails.messages.CCDS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: changeCredentials
// controller_description:
//      controller used to change the credentials of customer
customerModuleControllers.changeCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.changeCredentials(req.body);
    /** handle logic within service function */
    const changeCredentials = await customerModuleServices.changeCredentials({
      resetMode: validateBody.reset_mode,
      changedCredentials: validateBody.changed_credentials,
      customerRefId: req.customerRefId,
    });

    /**return response */
    return next({
      ...customerModuleConstants.changeCredentials.messages.CCCS001,
      result: "",
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: initiateResetCredentials
// controller_description:
//      controller used to initiate the process for resetting the credentials of customer
customerModuleControllers.initiateResetCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.initiateResetCredentials(
      req.body
    );
    /** handle logic within service function */
    const initiateReset = await customerModuleServices.initiateResetCredentials(
      {
        username: validateBody.username,
        twoFa: validateBody.two_fa,
        resetMode: validateBody.reset_mode,
      }
    );

    /**return response */
    return next({
      ...customerModuleConstants.initiateResetCredentials.messages.CIRCS001,
      result: initiateReset,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: confirmResetCredentials
// controller_description:
//      controller used to reset credentials of customer
customerModuleControllers.confirmResetCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.confirmResetCredentials(
      req.body
    );
    /** handle logic within service function */
    const confirmReset = await customerModuleServices.confirmResetCredentials({
      resetRequestId: validateBody.reset_request_id,
      resetCredentials: validateBody.reset_credentials,
    });

    /**return response */
    return next({
      ...customerModuleConstants.confirmResetCredentials.messages.CCRCS001,
      result: "",
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

module.exports = customerModuleControllers;
