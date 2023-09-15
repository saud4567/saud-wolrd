module.exports = {
  messages: {
    CIRCS001: {
      code: "CIRCS001",
      statusCode: 200,
      message: "",
    },
  },
  errorMessages: {
    CIRCE001: {
      code: "CIRCE001",
      statusCode: 400,
      message: "Username Is Required",
    },
    CIRCE002: {
      code: "CIRCE002",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Required",
    },
    CIRCE003: {
      code: "CIRCE003",
      statusCode: 400,
      message: "Reset Mode Is Required",
    },
    CIRCE004: {
      code: "CIRCE004",
      statusCode: 400,
      message:
        "Entered Email/Mobile Is Not Registered, Please Use Correct Credentials",
    },
    CIRCE005: {
      code: "CIRCE005",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Invalid",
    },
    CIRCE006: {
      code: "CIRCE006",
      statusCode: 400,
      message:
        "Only Platinum Subcription Plan Users Can Reset Password, You Can Reset mpin Or biometric",
    },
    CIRCE007: {
      code: "CIRCE007",
      statusCode: 400,
      message: "Reset Mode Is Invalid, It Should Be mpin/password/biometric",
    },
  },

  TEST_CONSTANT: {
    PAYLOAD: {
      username: "shalaka.devarde+7@techstalwarts.com",
      two_fa: "CEBPA1215P",
      reset_mode: "mpin",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // username: "shalaka.devarde+7@techstalwarts.com",
      // two_fa: "CEBPA1215P",
      // reset_mode: "mpin",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      username: "",
      two_fa: "",
      reset_mode: "",
    },
    PAYLOAD_KEYS: ["username", "two_fa", "reset_mode"],
    RESET_MODE: ["password", "mpin", "biometric"],
  },
};
