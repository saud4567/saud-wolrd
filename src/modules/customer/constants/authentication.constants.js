module.exports = {
  messages: {
    CAS001: {
      code: "CAS001",
      statusCode: 200,
      message: "Authentication Successful",
    },
    CAS002: {
      code: "CAS002",
      statusCode: 200,
      message: "",
    },
  },
  errorMessages: {
    CAE001: {
      code: "CAE001",
      statusCode: 400,
      message: "Username Is Required",
    },
    CAE002: {
      code: "CAE002",
      statusCode: 400,
      message: "Authentication Type Is Required",
    },
    CAE003: {
      code: "CAE003",
      statusCode: 400,
      message: "Authentication Type Is Invalid",
    },
    CAE004: {
      code: "CAE004",
      statusCode: 400,
      message: "Authorization Key Is Required",
    },
    CAE005: {
      code: "CAE005",
      statusCode: 400,
      message:
        "Entered email/mobile/customer Id is not registered please sign up using correct credentials",
    },
    CAE006: {
      code: "CAE006",
      statusCode: 400,
      message: "Please Enter Correct Credentials",
    },
    CAE007: {
      code: "CAE007",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Required",
    },
    CAE008: {
      code: "CAE008",
      statusCode: 400,
      message: "Two-factor Authentication Key Is Invalid",
    },
    CAE009: {
      code: "CAE009",
      statusCode: 400,
      message: "MPIN,Biometric And Password Are Required",
    },
    CAE010: {
      code: "CAE010",
      statusCode: 400,
      message: "MPIN AND Biometric Are Required",
    },
    CAE011: {
      code: "CAE011",
      statusCode: 400,
      message:
        "Credentials Does Not Match, <number> Number of Attempt(s) Remaining",
    },
    CAE012: {
      code: "CAE012",
      statusCode: 400,
      message: "Login Is Blocked, Please Try After 1 Hour",
    },
    CAE013: {
      code: "CAE013",
      statusCode: 400,
      message: "Password Is Required",
    },
    CAE014: {
      code: "CAE014",
      statusCode: 400,
      message: "MPIN OR Biometric OR Password Are Required",
    },
    CAE015: {
      code: "CAE015",
      statusCode: 400,
      message: "MPIN OR Biometric Are Required",
    },
    CAE016: {
      code: "CAE016",
      statusCode: 400,
      message: "MPIN OR Biometric OR Password Is Not Set For This User",
    },
    CAE017: {
      code: "CAE017",
      statusCode: 400,
      message: "MPIN Is Required",
    },
    CAE018: {
      code: "CAE018",
      statusCode: 400,
      message: "Biometric Is Required",
    },
  },
  AUTHORIZATION_TYPE: {
    password: "password",
    mpin: "mpin",
    biometric: "biometric",
  },
  SUBSCRIPTION_PLAN: {
    SILVER: "SILVER",
    GOLD: "GOLD",
    PLATINUM: "PLATINUM",
  },

  TEST_CONSTANT: {
    VALID_PAYLOAD: {
      username: "shalaka.devarde+11@techstalwarts.com",
      mpin: "123456",
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      //  username: "shalaka.devarde+11@techstalwarts.com",
      //  mpin: "123456",
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      username: "",
      mpin: "",
    },
    PASSWORD_KEYS: ["mpin", "password", "biometric"],
  },
};
