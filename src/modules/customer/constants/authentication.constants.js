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
        "Entered email/mobile is not registered please sign up using correct credentials",
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
      message: "MPIN OR Biometric OR Password Is Required",
    },
    CAE010: {
      code: "CAE010",
      statusCode: 400,
      message: "MPIN OR Biometric Is Required",
    },
    CAE011: {
      code: "CAE011",
      statusCode: 400,
      message: "Credentials Does Not Match",
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
};
