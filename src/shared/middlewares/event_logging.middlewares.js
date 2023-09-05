const sharedServices = require("../services");
const encryptionServices = require("shared/services/encryption.services");
const sharedConstants = require("shared/constants");

const getParams = (params) => {
  if (params.length === 3) {
    return {
      req: params[0],
      res: params[1],
      next: params[2],
    };
  }
  if (params.length === 4) {
    return {
      error: params[0],
      req: params[1],
      res: params[2],
      next: params[3],
    };
  }
};

const eventLoggingMiddleware = (...params) => {
  const { req, res, next, error } = getParams(params);
  const requestId = sharedServices.uuidServices.uuidV4();
  req.requestId = requestId;

  if (
    !req.headers["api-key"] &&
    !req.headers["api-secret"] &&
    sharedConstants.appConfig.app.isEncrypt == 1
  ) {
    try {
      if (req.headers["content-type"] != "text/plain") {
        res
          .status(400)
          .json(sharedConstants.masterConstants.errorMessages.ME001);
      }
      req.body = encryptionServices.decryptUsingRsaAlgorithm(
        req.body,
        (keyType = "REQUEST_PRIVATE")
      );
    } catch (error) {
      res.status(400).json(sharedConstants.masterConstants.errorMessages.ME001);
    }
  }

  req.on("end", () => requestOnEnd(...params));

  req.on("aborted", () => requestOnAbort(...params));

  req.on("error", (err) => requestOnError(...params, err));

  res.on("finish", () => responseOnFinish(...params));

  res.on("error", (err) => responseOnError(...params, err));

  next();
};

// method_name: requestOnEnd
// method_description:
//      gets called when request is received
const requestOnEnd = (req, res) => {
  console.log(`requestOnEnd`);
};

// method_name: requestOnAbort
// method_description:
//      gets called when the request has been aborted by the client.
const requestOnAbort = (req, res) => {
  console.log(`requestOnAbort`);
};

// method_name: requestOnError
// method_description:
//      gets called when an error occurs during request processing.
const requestOnError = (req, res, err) => {
  console.log(`requestOnError`);
};

// method_name: responseOnFinish
// method_description:
//      gets called when the entire response has been sent to the client.
const responseOnFinish = async (...params) => {
  const { req, res, next, error } = getParams(params);
  if (res.statusCode >= 200 && res.statusCode < 300) {
    sharedServices.loggerServices.success.info({
      requestId: req.requestId,
    });
  }
  if (res.statusCode >= 400 && res.statusCode < 500) {
    sharedServices.loggerServices.error.info({
      requestId: req.requestId,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
    });
  }
  if (res.statusCode >= 500 && res.statusCode < 600) {
    sharedServices.loggerServices.alert.info({
      requestId: req.requestId,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
    });
  }
};

// method_name: responseOnError
// method_description:
//      gets called when an error occurs during response processing.
const responseOnError = (req, res, err) => {
  console.log(`responseOnError`);
};

module.exports = eventLoggingMiddleware;
