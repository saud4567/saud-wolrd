module.exports = {
  messages: {
    CFTLVTS001: {
      code: "CFTLVTS001",
      statusCode: 200,
      message: "",
    },
  },
  errorMessages: {
    CFTLVTE001: {
      code: "CFTLVTE001",
      statusCode: 400,
      message: "Username Is Required",
    },
    CFTLVTE002: {
      code: "CFTLVTE002",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Required",
    },
    CFTLVTE003: {
      code: "CFTLVTE003",
      statusCode: 400,
      message: "Password Is Required",
    },
  },

  TEST_CONSTANT: {
    PAYLOAD_FOR_PLATINUM: {
      username: "shalaka.devarde+14@techstalwarts.com",
      two_fa: "CEBPA1217P",
      password: "Test@1234",
    },
    PAYLOAD_FOR_GOLD_SILVER: {
      username: "shalaka.devarde+7@techstalwarts.com",
      two_fa: "1992-06-12",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_PLATINUM: {
      // username: "shalaka.devarde+7@techstalwarts.com",
      // two_fa: "CEBPA1215P",
      // password: "123",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_GOLD_SILVER: {
      // username: "shalaka.devarde+7@techstalwarts.com",
      // two_fa: "CEBPA1215P",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_PLATINUM: {
      username: "",
      two_fa: "",
      password: "",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_GOLD_SILVER: {
      username: "",
      two_fa: "",
    },
    PAYLOAD_KEYS_FOR_PLATINUM: ["username", "two_fa", "password"],
    PAYLOAD_KEYS: ["username", "two_fa"],
  },
};
