module.exports = {
  messages: {
    CCCS001: {
      code: "CCCS001",
      statusCode: 200,
      message: "Credential Changed Successfully",
    },
  },
  errorMessages: {
    CCCE001: {
      code: "CCCE001",
      statusCode: 400,
      message: "Change Mode Is Required",
    },
    CCCE002: {
      code: "CCCE002",
      statusCode: 400,
      message: "Change Credential Is Required",
    },
    CCCE003: {
      code: "CCCE003",
      statusCode: 400,
      message:
        "Only Platinum Subcription Plan Users Can Update Password, you can update mpin or biometric",
    },
  },
};
