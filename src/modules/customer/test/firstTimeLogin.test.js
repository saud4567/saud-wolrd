const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        JWT token in result
// Case : Positive for platinum plan

describe("Case: Positive for platinum plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT.PAYLOAD_FOR_PLATINUM;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT
        .PAYLOAD_KEYS_FOR_PLATINUM
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE001.message
    );

    assert.isNotEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE002.message
    );

    assert.isNotEmpty(
      payload.mpin,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE003.message
    );

    assert.isNotEmpty(
      payload.biometric,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE004.message
    );

    assert.isNotEmpty(
      payload.password,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE005.message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
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

  it("Result object should contain token key", () => {
    assert.hasAllKeys(response.body.result, ["token"]);
  });
});

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        JWT token in result
// Case : Positive for gold and silver plan

describe("Case: Positive for gold and silver plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT
      .PAYLOAD_FOR_GOLD_SILVER;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE001.message
    );

    assert.isNotEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE002.message
    );

    assert.isNotEmpty(
      payload.mpin,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE003.message
    );

    assert.isNotEmpty(
      payload.biometric,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE004.message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
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

  it("Result object should contain token key", () => {
    assert.hasAllKeys(response.body.result, ["token"]);
  });
});

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        error message and code
// Case : Invalid Payload With Missing Keys for platinum plan
describe("Case : Invalid Payload With Missing Keys for platinum plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_PLATINUM;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have mandetory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT
        .PAYLOAD_KEYS_FOR_PLATINUM
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        error message and code
// Case : Invalid Payload With Missing Keys for gold and silver plan
describe("Case : Invalid Payload With Missing Keys for gold and silver plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS_FOR_GOLD_SILVER;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have mandetory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        error message and code
// Case : Invalid Payload With Empty Values or platinum plan
describe("Case : Invalid Payload With Empty Values or platinum plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_PLATINUM;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT
        .PAYLOAD_KEYS_FOR_PLATINUM
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE001.message
    );

    assert.isEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE002.message
    );

    assert.isEmpty(
      payload.mpin,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE003.message
    );

    assert.isEmpty(
      payload.biometric,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE004.message
    );

    assert.isEmpty(
      payload.password,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE005.message
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});

// Api  : /customer/first-login
// Desc : Customer first-login api should return
//        error message and code
// Case : Invalid Payload With Empty Values for gold and silver plan
describe("Case : Invalid Payload With Empty Values for gold and silver plan", () => {
  const payload =
    customerModuleConstants.firstTimeLogin.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES_FOR_GOLD_SILVER;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLogin.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE001.message
    );

    assert.isEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE002.message
    );

    assert.isEmpty(
      payload.mpin,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE003.message
    );

    assert.isEmpty(
      payload.biometric,
      customerModuleConstants.firstTimeLogin.errorMessages.CFTLE004.message
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});
