let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index.js");
let expect = chai.expect;
let assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("Registration API", () => {
  const payload = {
    customer_ref_id: "pqrxyz",
    name: "Shalaka Devarde",
    mobile: "9527294359",
    email: "shalaka.devarde+12@techstalwarts.com",
    gender: "FEMALE",
    dob: "1992-06-12",
    pan: "CEBPA1217P",
    aadhar: "952729432918",
    address: {
      address_line_1: "304, 3rd Floor, Radhakishan Apartment",
      address_line_2: "Devri Pada, Near City Hospital",
      address_line_3: "Malana Chowk, Dadar",
      city: "Mumbai",
      country: "India",
      pin_code: "401203",
      state: "Maharashtra",
    },
    father_name: "Pinto Smith",
    occupation: "Businessman",
    annual_income: "1600000",
    fatca: "YES",
    pep: "YES",
    customer_type: "RI",
    trading_experience: "5",
    subscription_plan: "PLATINUM",
    brokerage_plan: "GALAXC_FREEDOM",
    ddpi: "YES",
    dis_booklet: "YES",
    bsda: "YES",
    marital_status: "MARRIED",
    ucc_id: "DEF456",
    rm_code: "RM012",
    is_active: "1",
    password: "Test@1234",
    bank_account_details: [
      {
        bank_name: "HDFC BANK LTD",
        account_name: "USER 1",
        account_number: "1234567890",
        ifsc_code: "HDFC000001",
        upi_handle: "user1@upi",
        micr_code: "12121436576",
        is_default: "0",
      },
      {
        bank_name: "AXIS BANK LTD",
        account_name: "USER 2",
        account_number: "12176768778",
        ifsc_code: "AXIS1212191",
        upi_handle: "user2@upi",
        micr_code: "12454767877",
        is_default: "0",
      },
      {
        bank_name: "CENTRAL BANK OF INDIA",
        account_name: "USER 3",
        account_number: "1214345949",
        ifsc_code: "CBIB1212112",
        upi_handle: "user3@upi",
        micr_code: "12766878745",
        is_default: "1",
      },
    ],
    dp_details: [
      {
        dp_provider: "CDSL",
        dp_id: "1254672323",
        beneficiary_id: "87562357654",
        second_holder_name: "Sushmita Jain",
        is_default: "0",
      },
      {
        dp_provider: "NDSL",
        dp_id: "23234545412",
        beneficiary_id: "11267643434",
        second_holder_name: "Jaya Bhushan Kumar",
        is_default: "0",
      },
      {
        dp_provider: "CDSL",
        dp_id: "278789090876",
        beneficiary_id: "456883111246",
        second_holder_name: "Smrit Shah",
        is_default: "1",
      },
    ],
    product_details: [
      {
        product_code: "NSEEQ",
      },
      {
        product_code: "BSEEQ",
      },
      {
        product_code: "MF",
      },
    ],
  };
  describe("POST /customer/register", () => {
    it("It should register and return customer reference id", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.include.keys(
        "name",
        "mobile",
        "email",
        "gender",
        "dob",
        "address",
        "father_name",
        "occupation",
        "annual_income",
        "fatca",
        "pep",
        "customer_type",
        "trading_experience",
        "subscription_plan",
        "brokerage_plan",
        "ddpi",
        "dis_booklet",
        "bsda",
        "marital_status",
        "ucc_id",
        "rm_code",
        "is_active",
        "product_details"
      ).to.not.be.null;

      expect(payload.address).to.include.keys(
        "address_line_1",
        "city",
        "country",
        "pin_code",
        "state"
      ).to.not.be.null;

      if (payload.subscription_plan == "PLATINUM") {
        expect(payload).to.include.keys(
          "customer_ref_id",
          "pan",
          "aadhar",
          "password",
          "bank_account_details",
          "dp_details"
        ).to.not.be.null;
      }

      if (payload.bank_account_details) {
        assert.isArray(
          payload.bank_account_details,
          "bank_account_details should be an array"
        );

        payload.bank_account_details.map((b) => {
          expect(b).to.include.keys(
            "bank_name",
            "account_name",
            "account_number",
            "ifsc_code",
            "micr_code",
            "is_default"
          ).to.not.be.null;
        });
      }

      if (payload.dp_details) {
        assert.isArray(
          payload.dp_details,
          "bank_account_details should be an array"
        );
        payload.dp_details.map((d) => {
          expect(d).to.include.keys(
            "dp_provider",
            "dp_id",
            "beneficiary_id",
            "is_default"
          ).to.not.be.null;
        });
      }

      if (payload.product_details) {
        assert.isArray(
          payload.product_details,
          "bank_account_details should be an array"
        );
        payload.product_details.map((p) => {
          expect(p).to.include.keys("product_code").to.not.be.null;
        });
      }

      expect(payload.fatca).to.be.oneOf(["YES", "NO"]);
      expect(payload.pep).to.be.oneOf(["YES", "NO"]);
      expect(payload.gender).to.be.oneOf(["MALE", "FEMALE", "OTHER"]);
      expect(payload.customer_type).to.be.oneOf(["NRI", "RI"]);
      expect(payload.ddpi).to.be.oneOf(["YES", "NO"]);
      expect(payload.dis_booklet).to.be.oneOf(["YES", "NO"]);
      expect(payload.bsda).to.be.oneOf(["YES", "NO"]);

      expect(payload.subscription_plan).to.be.oneOf([
        "SILVER",
        "GOLD",
        "PLATINUM",
      ]);

      expect(payload.brokerage_plan).to.be.oneOf([
        "GALAXC",
        "GALAXC_PLUS",
        "GALAXC_FREEDOM",
      ]);
      expect(payload.marital_status).to.be.oneOf(["MARRIED", "UNMARRIED"]);
      expect(payload.is_active).to.be.oneOf(["0", "1"]);
      // expect(/[A-z\s]+$/.test(payload.name)).to.be.true;
      assert.isTrue(
        /[A-z\s]+$/.test(payload.name),
        "Name field should contain only alphabets"
      );

      assert.isTrue(
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(payload.dob),
        "Date of birth is invalid"
      );

      assert.isTrue(
        /[A-z\s]+$/.test(payload.father_name),
        "Father Name field should contain only alphabets"
      );

      assert.isTrue(
        /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email),
        "Email is invalid"
      );

      assert.isTrue(
        /^[6-9]\d{9}$/.test(payload.mobile),
        "Mobile number should contain digits only"
      );
      assert.isTrue(
        /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.annual_income),
        "Annual Income should contain numbers only"
      );
      assert.isTrue(
        /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.trading_experience),
        "Trading Experience should contain numbers only"
      );

      if (payload.pan) {
        assert.isTrue(
          /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(payload.pan),
          "Pan number is invalid"
        );
      }

      if (payload.aadhar) {
        assert.isTrue(
          /^\d{12}$/.test(payload.aadhar),
          "Aadhar number is invalid"
        );
      }

      chai
        .request(server)
        .post("/customer/register")
        .send(payload)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("result");
          response.body.result.should.have.property("customerId");
          done();
        });
    });
  });
});
