module.exports = {
  messages: {
    CLTS001: {
      code: "CLTS001",
      statusCode: 200,
      message: "",
    },
  },
  errorMessages: {
    CLTE001: {
      code: "CLTE001",
      statusCode: 400,
      message: "Username Is Required",
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
