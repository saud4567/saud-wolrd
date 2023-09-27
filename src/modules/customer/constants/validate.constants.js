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

  TEST_CONSTANTS: {
    VALID_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxOCwiY3VzdG9tZXJSZWZJZCI6InBxcnh5eiIsImlhdCI6MTY5NDcwMDc5MywiZXhwIjoxNjk0NzE1MTkzfQ.iNVH1-AQeybn_GE2_QcoyvRC8-syjRvC6ol-aaeaj2c",
    INVALID_TOKEN: "abc",
  },
};
