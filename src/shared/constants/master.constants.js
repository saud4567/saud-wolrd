const masterConstants = {
  errorMessages: {
    ME001: {
      code: "ME001",
      statusCode: 400,
      message: "Invalid Encrypted Data,Please Provide Valid Data",
    },
  },
  ENCRYPTION_DECRYPTION_KEYS: [
    "name",
    "mobile",
    "email",
    "gender",
    "dob",
    "pan",
    "address",
    "aadhar",
    "father_name",
    "occupation",
    "annual_income",
    "marital_status",
    "ucc_id",
    "bank_name",
    "account_name",
    "account_number",
    "ifsc_code",
    "upi_handle",
    "micr_code",
    "dp_id",
    "beneficiary_id",
    "second_holder_name",
    "username",
    "token",
  ],
};

module.exports = masterConstants;
