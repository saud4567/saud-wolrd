const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const customerModuleConstants = require("../constants");
const expect = chai.expect;
const assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("POST /customer/register", () => {
  const payload = customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD;

  it("check if payload is in object format", (done) => {
    expect(payload).to.be.a("object");
  });

  it("check if payload contains mandatory fields", (done) => {
    expect(payload).to.include.keys(
      customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD_KEYS
    ).to.not.be.null;
  });

  it("validate address object", (done) => {
    it("check if address object contains mandatory fields", (done) => {
      expect(payload.address).to.include.keys(
        customerModuleConstants.registration.ADDRESS_KEYS
      ).to.not.be.null;
    });
  });

  if (
    payload.subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    it("validate payload for platinum subscription plan", (done) => {
      it("check if payload  contains mandatory fields for platonum subscription plan", (done) => {
        expect(payload).to.include.keys(
          "customer_ref_id",
          "pan",
          "aadhar",
          "password",
          "bank_account_details",
          "dp_details"
        ).to.not.be.null;
      });
    });
  }

  if (payload.bank_account_details) {
    it("validate bank_account_details object", (done) => {
      it("validate bank_account_details should be an array of objects", (done) => {
        assert.isArray(
          payload.bank_account_details,
          "bank_account_details should be an array"
        );
      });

      it("validate bank_account_details contains mandatory fields", (done) => {
        payload.bank_account_details.map((b) => {
          expect(b).to.include.keys(
            customerModuleConstants.registration.BANK_DETAILS
          ).to.not.be.null;
        });
      });
    });
  }

  if (payload.dp_details) {
    it("validate dp_details object", (done) => {
      it("validate dp_details should be an array of objects", (done) => {
        assert.isArray(payload.dp_details, "dp_details should be an array");
      });

      it("validate dp_details contains mandatory fields", (done) => {
        payload.dp_details.map((d) => {
          expect(d).to.include.keys(
            customerModuleConstants.registration.DP_DETAILS
          ).to.not.be.null;
        });
      });
    });
  }

  if (payload.product_details) {
    it("validate product_details object", (done) => {
      it("validate product_details should be an array of objects", (done) => {
        assert.isArray(
          payload.product_details,
          "product_details should be an array"
        );
      });

      it("validate product_details contains mandatory fields", (done) => {
        payload.product_details.map((p) => {
          expect(p).to.include.keys(
            customerModuleConstants.registration.PRODUCT_DETAILS
          ).to.not.be.null;
        });
      });
    });
  }

  it("validate gender", (done) => {
    expect(payload.gender).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.GENDER
    );
  });

  it("validate fatca", (done) => {
    expect(payload.fatca).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate pep", (done) => {
    expect(payload.pep).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate customer_type", (done) => {
    expect(payload.customer_type).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.TYPE
    );
  });

  it("validate ddpi", (done) => {
    expect(payload.ddpi).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate dis_booklet", (done) => {
    expect(payload.dis_booklet).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate bsda", (done) => {
    expect(payload.bsda).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate subscription_plan", (done) => {
    expect(payload.subscription_plan).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.SUBSCRIPTION_PLAN
    );
  });

  it("validate brokerage_plan", (done) => {
    expect(payload.brokerage_plan).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.BROKERAGE_PLAN
    );
  });

  it("validate marital_status", (done) => {
    expect(payload.marital_status).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.MARITIAL_STATUS
    );
  });

  it("validate is_active", (done) => {
    expect(payload.is_active).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.IS_ACTIVE
    );
  });

  it("validate  email", (done) => {
    assert.isTrue(
      /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email),
      customerModuleConstants.registration.errorMessages.CRE005.message
    );
  });

  it("validate mobile", (done) => {
    assert.isTrue(
      /^[6-9]\d{9}$/.test(payload.mobile),
      customerModuleConstants.registration.errorMessages.CRE007.message
    );
  });

  it("validate name", (done) => {
    assert.isTrue(
      /[A-z\s]+$/.test(payload.name),
      customerModuleConstants.registration.errorMessages.CRE003.message
    );
  });

  it("validate date of birth", (done) => {
    assert.isTrue(
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(payload.dob),
      customerModuleConstants.registration.errorMessages.CRE011.message
    );
  });

  it("validate father_name", (done) => {
    assert.isTrue(
      /[A-z\s]+$/.test(payload.father_name),
      customerModuleConstants.registration.errorMessages.CRE019.message
    );
  });

  it("validate annual_income", (done) => {
    assert.isTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.annual_income),
      customerModuleConstants.registration.errorMessages.CRE023.message
    );
  });

  it("validate trading_experience", (done) => {
    assert.isTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.trading_experience),
      customerModuleConstants.registration.errorMessages.CRE075.message
    );
  });

  if (payload.pan) {
    it("validate pan", (done) => {
      assert.isTrue(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(payload.pan),
        customerModuleConstants.registration.errorMessages.CRE013.message
      );
    });
  }
  if (payload.aadhar) {
    it("validate aadhar", (done) => {
      assert.isTrue(
        /^\d{12}$/.test(payload.aadhar),
        customerModuleConstants.registration.errorMessages.CRE017.message
      );
    });
  }

  chai
    .request(server)
    .post("/customer/register")
    .send(payload)
    .end((err, response) => {
      if (response.status == 200) {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("result");
        response.body.result.should.have.property("customerId");
        done();
      }

      if (response.status == 400) {
        response.should.have.status(400);
        response.body.should.be.a("object");
        response.body.should.have.property("code");
        response.body.should.have.property("message");
        done();
      }
    });
});
