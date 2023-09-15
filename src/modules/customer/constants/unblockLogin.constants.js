module.exports = {
  messages: {
    CULS001: {
      code: "CULS001",
      statusCode: 200,
      message: "Login Unblocked Successfully",
    },
  },
  errorMessages: {
    CULE001: {
      code: "CULE001",
      statusCode: 400,
      message: "Username Is Required",
    },
    CULE002: {
      code: "CULE002",
      statusCode: 400,
      message: "Customer Details Not Found",
    },
    CULE003: {
      code: "CULE003",
      statusCode: 400,
      message: "Credentials Not Set For This User",
    },
  },
  TEST_CONSTANT: {
    PAYLOAD: {
      username: "shalaka.devarde+11@techstalwarts.com",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // username: "shalaka.devarde+11@techstalwarts.com",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      username: "",
    },
  },
};
