module.exports = {
  messages: {
    CCDS001: {
      code: "CCDS001",
      statusCode: 200,
      message: "Customer Details",
    },
  },
  errorMessages: {
    CCDE001: {
      code: "CCDE001",
      statusCode: 400,
      message: "api-key Is Required",
    },
    CCDE002: {
      code: "CCDE002",
      statusCode: 400,
      message: "api-key Is Invalid",
    },
    CCDE003: {
      code: "CCDE003",
      statusCode: 400,
      message: "api-secret Is Required",
    },
    CCDE004: {
      code: "CCDE004",
      statusCode: 400,
      message: "api-secret Is Invalid",
    },
    CCDE005: {
      code: "CCDE005",
      statusCode: 400,
      message: "Customer Id Is Required",
    },
    CCDE006: {
      code: "CCDE006",
      statusCode: 400,
      message: "Requested Field Data Is Required",
    },
    CCDE007: {
      code: "CCDE007",
      statusCode: 400,
      message: "Invalid Request Data Format",
    },
    CCDE008: {
      code: "CCDE008",
      statusCode: 400,
      message: "Customer Details Not Found",
    },
    CCDE009: {
      code: "CCDE009",
      statusCode: 400,
      message: "Token Is Required",
    },
  },

  TEST_CONSTANT: {
    VALID_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxOCwiY3VzdG9tZXJSZWZJZCI6InBxcnh5eiIsImlhdCI6MTY5NDc2OTYyOSwiZXhwIjoxNjk0ODAyMDI5fQ.74th88HEqVUCUApmKRrhKNjQx0ovQgeyHd7UwHqTGC8",
    INVALID_TOKEN: "123abc",
    VALID_API_KEY: "f3f84033-6547-44ce-809a-840de76d58ca",
    INVALID_API_KEY: "456",
    VALID_API_SECRET: "dZmExc9efjAywPvx7dVIYJ6lpvTdjqBIjh6FoFRs",
    INVALID_API_SECRET: "xyz",
    PAYLOAD: {
      customer_id: "pqrxyz",
      requested_data: [
        "name",
        "email",
        "pan",
        "mobile",
        "bank_name",
        "account_number",
        "dp_id",
        "beneficiary_id",
      ],
    },
    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // customer_id: "pqrxyz",
      // requested_data: [
      //   "name",
      //   "email",
      //   "pan",
      //   "mobile",
      //   "bank_name",
      //   "account_number",
      //   "dp_id",
      //   "beneficiary_id",
      // ],
    },
    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      customer_id: "",
      requested_data: "",
    },

    PAYLOAD_KEYS: ["customer_id", "requested_data"],
  },
};
