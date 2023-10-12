module.exports = {
  messages: {
    CFTLS001: {
      code: "CFTLS001",
      statusCode: 200,
      message: "",
    },
  },
  errorMessages: {
    CFTLE001: {
      code: "CFTLE001",
      statusCode: 400,
      message: "Username Is Required",
    },
    CFTLE002: {
      code: "CFTLE002",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Required",
    },
    CFTLE003: {
      code: "CFTLE003",
      statusCode: 400,
      message: "Mpin Is Required",
    },
    CFTLE004: {
      code: "CFTLE004",
      statusCode: 400,
      message: "Biometric Is Required",
    },
    CFTLE005: {
      code: "CFTLE005",
      statusCode: 400,
      message: "Password Is Required",
    },
  },

  TEST_CONSTANT: {
    PAYLOAD: {
      username: "shalaka.devarde+14@techstalwarts.com",
      two_fa: "CEBPA1217P",
      mpin: "123456",
      biometric: "123",
      password: "123",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      //   username: "shalaka.devarde+6@techstalwarts.com",
      //   two_fa: "CEBPA1214P",
      //   mpin: "new@1234",
      //   biometric: "123",
      //   password: "123",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      username: "",
      two_fa: "",
      mpin: "",
      biometric: "",
      password: "",
    },

    PAYLOAD_FOR_PLATINUM: {
      username: "shalaka.devarde+14@techstalwarts.com",
      two_fa: "CEBPA1217P",
      mpin: "123456",
      biometric: "123",
      password: "123",
    },
    PAYLOAD_FOR_GOLD_SILVER: {
      username: "shalaka.devarde+7@techstalwarts.com",
      two_fa: "1992-06-12",
      mpin: "123456",
      biometric: "123",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_PLATINUM: {
      // username: "shalaka.devarde+14@techstalwarts.com",
      // two_fa: "CEBPA1217P",
      // mpin: "123456",
      // biometric: "123",
      // password: "123",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_GOLD_SILVER: {
      // username: "shalaka.devarde+7@techstalwarts.com",
      // two_fa: "1992-06-12",
      // mpin: "123456",
      // biometric: "123",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_PLATINUM: {
      username: "",
      two_fa: "",
      mpin: "",
      biometric: "",
      password: "",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_GOLD_SILVER: {
      username: "",
      two_fa: "",
      mpin: "",
      biometric: "",
    },
    PAYLOAD_KEYS_FOR_PLATINUM: [
      "username",
      "two_fa",
      "mpin",
      "biometric",
      "password",
    ],
    PAYLOAD_KEYS: ["username", "two_fa", "mpin", "biometric"],
  },
};
