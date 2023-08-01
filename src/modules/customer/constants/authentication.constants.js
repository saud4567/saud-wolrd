module.exports = {
  messages: {
    CAS001: {
      code: "CAS001",
      statusCode: 200,
      message: "Authentication Successful",
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
      message: "Please Enter Correct Password",
    },
  },
  AUTHORIZATION_TYPE: {
    password: "password",
    mpin: "mpin",
    biometric: "biometric",
  },
};
