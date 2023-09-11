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
    PAYLOAD: {
      username: "shalaka.devarde+7@techstalwarts.com",
      two_fa: "CEBPA1215P",
      password: "123",
    },
    PAYLOAD_KEYS: ["username", "two_fa"],
  },
};
