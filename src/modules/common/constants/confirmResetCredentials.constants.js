module.exports = {
  messages: {
    CCRCS001: {
      code: "CCRCS001",
      statusCode: 200,
      message: "Credentials Reset Successfully",
    },
  },
  errorMessages: {
    CCRCE001: {
      code: "CCRCE001",
      statusCode: 400,
      message: "Reset Request Id Is Required",
    },
    CCRCE002: {
      code: "CCRCE002",
      statusCode: 400,
      message: "Reset Credentials Is Required",
    },
    CCRCE003: {
      code: "CCRCE003",
      statusCode: 400,
      message: "Customer Reset Request Not Found",
    },
    CCRCE004: {
      code: "CCRCE004",
      statusCode: 400,
      message: "Customer Reset Request Is Expired",
    },
  },
  RESET_TYPE: {
    PASSWORD: "PASSWORD",
    MPIN: "MPIN",
    BIOMETRIC: "BIOMETRIC",
  },
};
