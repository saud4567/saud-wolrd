module.exports = {
  messages: {
    CCCS001: {
      code: "CCCS001",
      statusCode: 200,
      message: "Credential Changed Successfully",
    },
  },
  errorMessages: {
    CCCE001: {
      code: "CCCE001",
      statusCode: 400,
      message: "Reset Mode Is Required",
    },
    CCCE002: {
      code: "CCCE002",
      statusCode: 400,
      message: "Change Credential Is Required",
    },
    CCCE003: {
      code: "CCCE003",
      statusCode: 400,
      message:
        "Only Platinum Subcription Plan Users Can Update Password, you can update mpin or biometric",
    },
    CCCE004: {
      code: "CCCE004",
      statusCode: 400,
      message: "Reset Mode Is Invalid, It Should Be mpin/password/biometric",
    },
  },

  TEST_CONSTANT: {
    VALID_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxOCwiY3VzdG9tZXJSZWZJZCI6InBxcnh5eiIsImlhdCI6MTY5NDc2OTYyOSwiZXhwIjoxNjk0ODAyMDI5fQ.74th88HEqVUCUApmKRrhKNjQx0ovQgeyHd7UwHqTGC8",
    INVALID_TOKEN: "123abc",
    PAYLOAD: {
      reset_mode: "mpin",
      changed_credentials: "123456",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // "reset_mode":"mpin",
      // "changed_credentials":"123456"
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      reset_mode: "",
      changed_credentials: "",
    },

    RESET_MODE: ["password", "mpin", "biometric"],
    PAYLOAD_KEYS: ["reset_mode", "changed_credentials"],
  },
};
