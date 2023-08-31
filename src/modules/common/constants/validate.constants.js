module.exports = {
  messages: {
    CVS001: {
      code: "CVS001",
      statusCode: 200,
      message: "Token Validate Successfully",
    },
  },
  errorMessages: {
    CVE001: {
      code: "CVE001",
      statusCode: 400,
      message: "Token Is Required",
    },
    CVE002: {
      code: "CVE002",
      statusCode: 400,
      message: "Your Token Is Expired or Invalidate",
    },
  },
  tokenExpiredError: "TokenExpiredError",
  JsonWebTokenError: "JsonWebTokenError",
};
