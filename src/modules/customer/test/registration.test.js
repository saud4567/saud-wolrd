const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/register
// Desc : Customer register api should return
//        customerId in result
// Case : Positive

describe("Case: Positive", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT.VALID_PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("address should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload.address,
      customerModuleConstants.registration.ADDRESS_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.name,
      customerModuleConstants.registration.errorMessages.CRE002.message
    );
    assert.isNotEmpty(
      payload.email,
      customerModuleConstants.registration.errorMessages.CRE004.message
    );
    assert.isNotEmpty(
      payload.mobile,
      customerModuleConstants.registration.errorMessages.CRE006.message
    );
    assert.isNotEmpty(
      payload.gender,
      customerModuleConstants.registration.errorMessages.CRE008.message
    );
    assert.isNotEmpty(
      payload.dob,
      customerModuleConstants.registration.errorMessages.CRE010.message
    );
    assert.isNotEmpty(
      payload.address,
      customerModuleConstants.registration.errorMessages.CRE014.message
    );
    assert.isNotEmpty(
      payload.father_name,
      customerModuleConstants.registration.errorMessages.CRE018.message
    );
    assert.isNotEmpty(
      payload.occupation,
      customerModuleConstants.registration.errorMessages.CRE021.message
    );
    assert.isNotEmpty(
      payload.annual_income,
      customerModuleConstants.registration.errorMessages.CRE022.message
    );
    assert.isNotEmpty(
      payload.fatca,
      customerModuleConstants.registration.errorMessages.CRE024.message
    );
    assert.isNotEmpty(
      payload.pep,
      customerModuleConstants.registration.errorMessages.CRE026.message
    );
    assert.isNotEmpty(
      payload.customer_type,
      customerModuleConstants.registration.errorMessages.CRE028.message
    );
    assert.isNotEmpty(
      payload.trading_experience,
      customerModuleConstants.registration.errorMessages.CRE030.message
    );
    assert.isNotEmpty(
      payload.subscription_plan,
      customerModuleConstants.registration.errorMessages.CRE031.message
    );
    assert.isNotEmpty(
      payload.brokerage_plan,
      customerModuleConstants.registration.errorMessages.CRE033.message
    );
    assert.isNotEmpty(
      payload.ddpi,
      customerModuleConstants.registration.errorMessages.CRE035.message
    );
    assert.isNotEmpty(
      payload.dis_booklet,
      customerModuleConstants.registration.errorMessages.CRE037.message
    );
    assert.isNotEmpty(
      payload.bsda,
      customerModuleConstants.registration.errorMessages.CRE039.message
    );
    assert.isNotEmpty(
      payload.marital_status,
      customerModuleConstants.registration.errorMessages.CRE041.message
    );
    assert.isNotEmpty(
      payload.ucc_id,
      customerModuleConstants.registration.errorMessages.CRE043.message
    );
    assert.isNotEmpty(
      payload.rm_code,
      customerModuleConstants.registration.errorMessages.CRE044.message
    );
    assert.isNotEmpty(
      payload.is_active,
      customerModuleConstants.registration.errorMessages.CRE060.message
    );
    assert.isNotEmpty(
      payload.product_details,
      customerModuleConstants.registration.errorMessages.CRE067.message
    );
  });

  if (
    payload.subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    it("payload should contains mandatory fields for platinum subscription plan", () => {
      assert.containsAllKeys(payload, [
        "customer_ref_id",
        "pan",
        "aadhar",
        "password",
        "bank_account_details",
        "dp_details",
      ]);
    });

    it("mandatory fields should not be empty", () => {
      assert.isNotEmpty(
        payload.customer_ref_id,
        customerModuleConstants.registration.errorMessages.CRE001.message
      );
      assert.isNotEmpty(
        payload.pan,
        customerModuleConstants.registration.errorMessages.CRE012.message
      );
      assert.isNotEmpty(
        payload.aadhar,
        customerModuleConstants.registration.errorMessages.CRE016.message
      );
      assert.isNotEmpty(
        payload.password,
        customerModuleConstants.registration.errorMessages.CRE045.message
      );
      assert.isNotEmpty(
        payload.bank_account_details,
        customerModuleConstants.registration.errorMessages.CRE051.message
      );
      assert.isNotEmpty(
        payload.dp_details,
        customerModuleConstants.registration.errorMessages.CRE062.message
      );
    });
  }

  if (payload.bank_account_details) {
    it("bank_account_details should be an array", () => {
      assert.isArray(
        payload.bank_account_details,
        "bank_account_details should be an array"
      );
    });

    it("bank_account_details should contains mandatory fields", () => {
      payload.bank_account_details.map((b) => {
        assert.containsAllKeys(
          b,
          customerModuleConstants.registration.BANK_DETAILS
        );

        assert.isNotEmpty(
          b.bank_name,
          customerModuleConstants.registration.errorMessages.CRE053.message
        );

        assert.isNotEmpty(
          b.account_name,
          customerModuleConstants.registration.errorMessages.CRE054.message
        );

        assert.isNotEmpty(
          b.account_number,
          customerModuleConstants.registration.errorMessages.CRE055.message
        );

        assert.isNotEmpty(
          b.ifsc_code,
          customerModuleConstants.registration.errorMessages.CRE056.message
        );

        assert.isNotEmpty(
          b.micr_code,
          customerModuleConstants.registration.errorMessages.CRE057.message
        );
        assert.isNotEmpty(
          b.is_default,
          customerModuleConstants.registration.errorMessages.CRE058.message
        );
        expect(b.is_default).to.be.oneOf(
          customerModuleConstants.registration.TEST_CONSTANT.IS_ACTIVE
        );
      });
    });
  }

  if (payload.dp_details) {
    it("dp_details should be an array", () => {
      assert.isArray(payload.dp_details, "dp_details should be an array");
    });

    it("dp_details should contains mandatory fields", () => {
      payload.dp_details.map((d) => {
        assert.containsAllKeys(
          d,
          customerModuleConstants.registration.DP_DETAILS
        );

        assert.isNotEmpty(
          d.dp_provider,
          customerModuleConstants.registration.errorMessages.CRE078.message
        );
        assert.isNotEmpty(
          d.dp_id,
          customerModuleConstants.registration.errorMessages.CRE064.message
        );
        assert.isNotEmpty(
          d.beneficiary_id,
          customerModuleConstants.registration.errorMessages.CRE065.message
        );
        assert.isNotEmpty(
          d.is_default,
          customerModuleConstants.registration.errorMessages.CRE058.message
        );
        expect(d.is_default).to.be.oneOf(
          customerModuleConstants.registration.TEST_CONSTANT.IS_ACTIVE
        );
      });
    });
  }

  if (payload.product_details) {
    it("product_details should be an array", () => {
      assert.isArray(
        payload.product_details,
        "product_details should be an array"
      );
    });

    it("product_details should contains mandatory fields", () => {
      payload.product_details.map((p) => {
        assert.containsAllKeys(
          p,
          customerModuleConstants.registration.PRODUCT_DETAILS
        );

        assert.isNotEmpty(
          p.product_code,
          customerModuleConstants.registration.errorMessages.CRE069.message
        );
      });
    });
  }

  it("validate gender", () => {
    expect(payload.gender).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.GENDER
    );
  });

  it("validate fatca", () => {
    expect(payload.fatca).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate pep", () => {
    expect(payload.pep).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate customer_type", () => {
    expect(payload.customer_type).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.TYPE
    );
  });

  it("validate ddpi", () => {
    expect(payload.ddpi).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate dis_booklet", () => {
    expect(payload.dis_booklet).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate bsda", () => {
    expect(payload.bsda).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate subscription_plan", () => {
    expect(payload.subscription_plan).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.SUBSCRIPTION_PLAN
    );
  });

  it("validate brokerage_plan", () => {
    expect(payload.brokerage_plan).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.BROKERAGE_PLAN
    );
  });

  it("validate marital_status", () => {
    expect(payload.marital_status).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.MARITIAL_STATUS
    );
  });

  it("validate is_active", () => {
    expect(payload.is_active).to.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.IS_ACTIVE
    );
  });

  it("validate  email", () => {
    assert.isTrue(
      /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email),
      customerModuleConstants.registration.errorMessages.CRE005.message
    );
  });

  it("validate mobile", () => {
    assert.isTrue(
      /^[6-9]\d{9}$/.test(payload.mobile),
      customerModuleConstants.registration.errorMessages.CRE007.message
    );
  });

  it("validate name", () => {
    assert.isTrue(
      /[A-z\s]+$/.test(payload.name),
      customerModuleConstants.registration.errorMessages.CRE003.message
    );
  });

  it("validate date of birth", () => {
    assert.isTrue(
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(payload.dob),
      customerModuleConstants.registration.errorMessages.CRE011.message
    );
  });

  it("validate father_name", () => {
    assert.isTrue(
      /[A-z\s]+$/.test(payload.father_name),
      customerModuleConstants.registration.errorMessages.CRE019.message
    );
  });

  it("validate annual_income", () => {
    assert.isTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.annual_income),
      customerModuleConstants.registration.errorMessages.CRE023.message
    );
  });

  it("validate trading_experience", () => {
    assert.isTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.trading_experience),
      customerModuleConstants.registration.errorMessages.CRE075.message
    );
  });

  if (payload.pan) {
    it("validate pan", () => {
      assert.isTrue(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(payload.pan),
        customerModuleConstants.registration.errorMessages.CRE013.message
      );
    });
  }
  if (payload.aadhar) {
    it("validate aadhar", () => {
      assert.isTrue(
        /^\d{12}$/.test(payload.aadhar),
        customerModuleConstants.registration.errorMessages.CRE017.message
      );
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 200", () => {
    expect(response).to.have.status(200);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message, result", () => {
    assert.hasAllKeys(response.body, ["code", "message", "result"]);
  });

  it("Result object should contain customerId key", () => {
    assert.hasAllKeys(response.body.result, ["customerId"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Payload With Missing Keys

describe("Case: Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("if payload does not contain mandatory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  if (
    payload.subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    it("if payload does not contain mandatory fields for platinum subscription plan", () => {
      assert.doesNotHaveAllKeys(payload, [
        "customer_ref_id",
        "pan",
        "aadhar",
        "password",
        "bank_account_details",
        "dp_details",
      ]);
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

describe("Case: Invalid Address field With Missing Keys", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_ADDRESS_WITH_MISSING_KEYS;

  it("if address does not contain mandatory fields", () => {
    assert.doesNotHaveAllKeys(
      payload.address,
      customerModuleConstants.registration.ADDRESS_KEYS
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

describe("Case: Invalid bank_account_details field With Missing Keys", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_BANK_DETAILS_WITH_MISSING_KEYS;
  if (payload.bank_account_details) {
    it("bank_account_details should be an array", () => {
      assert.isArray(
        payload.bank_account_details,
        "bank_account_details should be an array"
      );
    });

    it("bank_account_details does not contain mandatory fields", () => {
      payload.bank_account_details.map((b) => {
        assert.doesNotHaveAllKeys(
          b,
          customerModuleConstants.registration.BANK_DETAILS
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

describe("Case: Invalid dp_details field With Missing Keys", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_DP_DETAILS_WITH_MISSING_KEYS;
  if (payload.dp_details) {
    it("dp_details should be an array", () => {
      assert.isArray(payload.dp_details, "dp_details should be an array");
    });

    it("dp_details does not contain mandatory fields", () => {
      payload.dp_details.map((d) => {
        assert.doesNotHaveAllKeys(
          d,
          customerModuleConstants.registration.DP_DETAILS
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

describe("Case: Invalid product_details field With Missing Keys", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_PRODUCT_DETAILS_WITH_MISSING_KEYS;
  if (payload.product_details) {
    it("product_details should be an array", () => {
      assert.isArray(
        payload.product_details,
        "product_details should be an array"
      );
    });

    it("product_details does not contain mandatory fields", () => {
      payload.product_details.map((p) => {
        assert.doesNotHaveAllKeys(
          p,
          customerModuleConstants.registration.PRODUCT_DETAILS
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Payload With All Keys But Empty Values
describe("Case: Invalid Payload With All Keys But Empty Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("payload mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.name,
      customerModuleConstants.registration.errorMessages.CRE002.message
    );
    assert.isEmpty(
      payload.email,
      customerModuleConstants.registration.errorMessages.CRE004.message
    );
    assert.isEmpty(
      payload.mobile,
      customerModuleConstants.registration.errorMessages.CRE006.message
    );
    assert.isEmpty(
      payload.gender,
      customerModuleConstants.registration.errorMessages.CRE008.message
    );
    assert.isEmpty(
      payload.dob,
      customerModuleConstants.registration.errorMessages.CRE010.message
    );
    assert.isEmpty(
      payload.address,
      customerModuleConstants.registration.errorMessages.CRE014.message
    );
    assert.isEmpty(
      payload.father_name,
      customerModuleConstants.registration.errorMessages.CRE018.message
    );
    assert.isEmpty(
      payload.occupation,
      customerModuleConstants.registration.errorMessages.CRE021.message
    );
    assert.isEmpty(
      payload.annual_income,
      customerModuleConstants.registration.errorMessages.CRE022.message
    );
    assert.isEmpty(
      payload.fatca,
      customerModuleConstants.registration.errorMessages.CRE024.message
    );
    assert.isEmpty(
      payload.pep,
      customerModuleConstants.registration.errorMessages.CRE026.message
    );
    assert.isEmpty(
      payload.customer_type,
      customerModuleConstants.registration.errorMessages.CRE028.message
    );
    assert.isEmpty(
      payload.trading_experience,
      customerModuleConstants.registration.errorMessages.CRE030.message
    );
    assert.isEmpty(
      payload.subscription_plan,
      customerModuleConstants.registration.errorMessages.CRE031.message
    );
    assert.isEmpty(
      payload.brokerage_plan,
      customerModuleConstants.registration.errorMessages.CRE033.message
    );
    assert.isEmpty(
      payload.ddpi,
      customerModuleConstants.registration.errorMessages.CRE035.message
    );
    assert.isEmpty(
      payload.dis_booklet,
      customerModuleConstants.registration.errorMessages.CRE037.message
    );
    assert.isEmpty(
      payload.bsda,
      customerModuleConstants.registration.errorMessages.CRE039.message
    );
    assert.isEmpty(
      payload.marital_status,
      customerModuleConstants.registration.errorMessages.CRE041.message
    );
    assert.isEmpty(
      payload.ucc_id,
      customerModuleConstants.registration.errorMessages.CRE043.message
    );
    assert.isEmpty(
      payload.rm_code,
      customerModuleConstants.registration.errorMessages.CRE044.message
    );
    assert.isEmpty(
      payload.is_active,
      customerModuleConstants.registration.errorMessages.CRE060.message
    );
    assert.isEmpty(
      payload.product_details,
      customerModuleConstants.registration.errorMessages.CRE067.message
    );
  });
  if (
    payload.subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    it("payload should contains mandatory fields for platinum subscription plan", () => {
      assert.containsAllKeys(payload, [
        "customer_ref_id",
        "pan",
        "aadhar",
        "password",
        "bank_account_details",
        "dp_details",
      ]);
    });
    it("payload mandatory fields should not be empty", () => {
      assert.isEmpty(
        payload.customer_ref_id,
        customerModuleConstants.registration.errorMessages.CRE001.message
      );
      assert.isEmpty(
        payload.pan,
        customerModuleConstants.registration.errorMessages.CRE012.message
      );
      assert.isEmpty(
        payload.aadhar,
        customerModuleConstants.registration.errorMessages.CRE016.message
      );
      assert.isEmpty(
        payload.password,
        customerModuleConstants.registration.errorMessages.CRE045.message
      );
      assert.isEmpty(
        payload.bank_account_details,
        customerModuleConstants.registration.errorMessages.CRE051.message
      );
      assert.isEmpty(
        payload.dp_details,
        customerModuleConstants.registration.errorMessages.CRE062.message
      );
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Address field With All Keys But Empty Values
describe("Case: Invalid Address field With All Keys But Empty Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_ADDRESS_WITH_ALL_KEYS_BUT_EMPTY_VALUES;
  it("address should contain all mandatory fields", () => {
    assert.containsAllKeys(
      payload.address,
      customerModuleConstants.registration.ADDRESS_KEYS
    );
  });
  it("mandetory fields should not be empty", () => {
    assert.isEmpty(
      payload.address.address_line_1,
      customerModuleConstants.registration.errorMessages.CRE079.message
    );
    assert.isEmpty(
      payload.address.city,
      customerModuleConstants.registration.errorMessages.CRE080.message
    );
    assert.isEmpty(
      payload.address.country,
      customerModuleConstants.registration.errorMessages.CRE081.message
    );
    assert.isEmpty(
      payload.address.pin_code,
      customerModuleConstants.registration.errorMessages.CRE082.message
    );
    assert.isEmpty(
      payload.address.state,
      customerModuleConstants.registration.errorMessages.CRE083.message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties  message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid bank_account_details field With All Keys But Empty Values
describe("Case: Invalid bank_account_details field With All Keys But Empty Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_BANK_DETAILS_WITH_ALL_KEYS_BUT_EMPTY_VALUES;

  if (payload.bank_account_details) {
    it("bank_account_details should be an array", () => {
      assert.isArray(
        payload.bank_account_details,
        "bank_account_details should be an array"
      );
    });

    it("bank_account_details should contains mandatory fields", () => {
      payload.bank_account_details.map((b) => {
        assert.containsAllKeys(
          b,
          customerModuleConstants.registration.BANK_DETAILS
        );

        assert.isEmpty(
          b.bank_name,
          customerModuleConstants.registration.errorMessages.CRE053.message
        );

        assert.isEmpty(
          b.account_name,
          customerModuleConstants.registration.errorMessages.CRE054.message
        );

        assert.isEmpty(
          b.account_number,
          customerModuleConstants.registration.errorMessages.CRE055.message
        );

        assert.isEmpty(
          b.ifsc_code,
          customerModuleConstants.registration.errorMessages.CRE056.message
        );

        assert.isEmpty(
          b.micr_code,
          customerModuleConstants.registration.errorMessages.CRE057.message
        );
        assert.isEmpty(
          b.is_default,
          customerModuleConstants.registration.errorMessages.CRE058.message
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties  message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid dp_details field With All Keys But Empty Values
describe("Case: Invalid dp_details field With All Keys But Empty Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_DP_DETAILS_WITH_ALL_KEYS_BUT_EMPTY_VALUES;

  if (payload.dp_details) {
    it("dp_details should be an array", () => {
      assert.isArray(payload.dp_details, "dp_details should be an array");
    });

    it("dp_details should contains mandatory fields", () => {
      payload.dp_details.map((d) => {
        assert.containsAllKeys(
          d,
          customerModuleConstants.registration.DP_DETAILS
        );

        assert.isEmpty(
          d.dp_provider,
          customerModuleConstants.registration.errorMessages.CRE078.message
        );
        assert.isEmpty(
          d.dp_id,
          customerModuleConstants.registration.errorMessages.CRE064.message
        );
        assert.isEmpty(
          d.beneficiary_id,
          customerModuleConstants.registration.errorMessages.CRE065.message
        );
        assert.isEmpty(
          d.is_default,
          customerModuleConstants.registration.errorMessages.CRE058.message
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties  message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Invalid product_details field With All Keys But Empty Values
describe("Case: Invalid product_details field With All Keys But Empty Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .INVALID_PRODUCT_DETAILS_WITH_ALL_KEYS_BUT_EMPTY_VALUES;

  if (payload.product_details) {
    it("product_details should be an array", () => {
      assert.isArray(
        payload.product_details,
        "product_details should be an array"
      );
    });

    it("product_details should contains mandatory fields", () => {
      payload.product_details.map((p) => {
        assert.containsAllKeys(
          p,
          customerModuleConstants.registration.PRODUCT_DETAILS
        );

        assert.isEmpty(
          p.product_code,
          customerModuleConstants.registration.errorMessages.CRE069.message
        );
      });
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties  message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /customer/register
// Desc : Customer register api should return
//        error message and code
// Case : Payload With All Keys But Invalid Values
describe("Case:Payload With All Keys But Invalid Values", () => {
  const payload =
    customerModuleConstants.registration.TEST_CONSTANT
      .PAYLOAD_WITH_All_KEYS_BUT_INVALID_VALUES;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.registration.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("validate gender", () => {
    expect(payload.gender).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.GENDER
    );
  });

  it("validate fatca", () => {
    expect(payload.fatca).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate pep", () => {
    expect(payload.pep).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate customer_type", () => {
    expect(payload.customer_type).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.TYPE
    );
  });

  it("validate ddpi", () => {
    expect(payload.ddpi).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate dis_booklet", () => {
    expect(payload.dis_booklet).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate bsda", () => {
    expect(payload.bsda).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.YES_NO_FLAG
    );
  });

  it("validate subscription_plan", () => {
    expect(payload.subscription_plan).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.SUBSCRIPTION_PLAN
    );
  });

  it("validate brokerage_plan", () => {
    expect(payload.brokerage_plan).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.BROKERAGE_PLAN
    );
  });

  it("validate marital_status", () => {
    expect(payload.marital_status).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.MARITIAL_STATUS
    );
  });

  it("validate is_active", () => {
    expect(payload.is_active).to.not.be.oneOf(
      customerModuleConstants.registration.TEST_CONSTANT.IS_ACTIVE
    );
  });

  it("validate  email", () => {
    assert.isNotTrue(
      /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email),
      customerModuleConstants.registration.errorMessages.CRE005.message
    );
  });

  it("validate mobile", () => {
    assert.isNotTrue(
      /^[6-9]\d{9}$/.test(payload.mobile),
      customerModuleConstants.registration.errorMessages.CRE007.message
    );
  });

  it("validate name", () => {
    assert.isNotTrue(
      /[A-z\s]+$/.test(payload.name),
      customerModuleConstants.registration.errorMessages.CRE003.message
    );
  });

  it("validate date of birth", () => {
    assert.isNotTrue(
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(payload.dob),
      customerModuleConstants.registration.errorMessages.CRE011.message
    );
  });

  it("validate father_name", () => {
    assert.isNotTrue(
      /[A-z\s]+$/.test(payload.father_name),
      customerModuleConstants.registration.errorMessages.CRE019.message
    );
  });

  it("validate annual_income", () => {
    assert.isNotTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.annual_income),
      customerModuleConstants.registration.errorMessages.CRE023.message
    );
  });

  it("validate trading_experience", () => {
    assert.isNotTrue(
      /[+-]?([0-9]*[.])?[0-9]+$/.test(payload.trading_experience),
      customerModuleConstants.registration.errorMessages.CRE075.message
    );
  });

  if (payload.pan) {
    it("validate pan", () => {
      assert.isNotTrue(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(payload.pan),
        customerModuleConstants.registration.errorMessages.CRE013.message
      );
    });
  }
  if (payload.aadhar) {
    it("validate aadhar", () => {
      assert.isNotTrue(
        /^\d{12}$/.test(payload.aadhar),
        customerModuleConstants.registration.errorMessages.CRE017.message
      );
    });
  }

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/register")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});
