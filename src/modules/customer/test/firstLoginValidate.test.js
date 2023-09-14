const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/first-login-validate
// Desc : Customer first-login-validate api should return
//        isValid flag in result
// Case : Positive

describe("Case: Positive", () => {
  const payload =
    customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE001
        .message
    );
    assert.isNotEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE002
        .message
    );

    if (payload.password) {
      assert.isNotEmpty(
        payload.password,
        customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE003
          .message
      );
    }
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login-validate")
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
    assert.hasAllKeys(response.body.result, ["isValid"]);
  });
});

// Api  : /customer/first-login-validate
// Desc : Customer first-login-validate api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have property username", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login-validate")
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

// Api  : /customer/first-login-validate
// Desc : Customer first-login-validate api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE001
        .message
    );
    assert.isEmpty(
      payload.two_fa,
      customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE002
        .message
    );

    if (payload.password) {
      assert.isEmpty(
        payload.password,
        customerModuleConstants.firstTimeLoginValidate.errorMessages.CFTLVTE003
          .message
      );
    }
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/first-login-validate")
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
