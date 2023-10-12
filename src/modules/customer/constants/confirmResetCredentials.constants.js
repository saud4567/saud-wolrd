module.exports = {
  messages: {
    CCRCS001: {
      code: "CCRCS001",
      statusCode: 200,
      message: "Credentials Reset Successfully",
    },
  },
  errorMessages: {
    CCRCE001: {
      code: "CCRCE001",
      statusCode: 400,
      message: "Reset Request Id Is Required",
    },
    CCRCE002: {
      code: "CCRCE002",
      statusCode: 400,
      message: "Reset Credentials Is Required",
    },
    CCRCE003: {
      code: "CCRCE003",
      statusCode: 400,
      message: "Customer Reset Request Not Found",
    },
    CCRCE004: {
      code: "CCRCE004",
      statusCode: 400,
      message: "Customer Reset Request Is Expired",
    },
  },
  RESET_TYPE: {
    PASSWORD: "PASSWORD",
    MPIN: "MPIN",
    BIOMETRIC: "BIOMETRIC",
  },

  TEST_CONSTANT: {
    PAYLOAD: {
      reset_request_id: "fda0d993-76d8-47cb-8917-6b838e51bd80",
      reset_credentials: "new@1234",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // reset_request_id: "266d949e-603b-4e52-ac72-b323a39ce8e0",
      //  reset_credentials: "new@1234",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      reset_request_id: "",
      reset_credentials: "",
    },
    INVALID_PAYLOAD_WITH_EXPIRED_RESET_REQUEST: {
      reset_request_id: "266d949e-603b-4e52-ac72-b323a39ce8e0",
      reset_credentials: "new@1234",
    },
    PAYLOAD_KEYS: ["reset_request_id", "reset_credentials"],
  },
};
