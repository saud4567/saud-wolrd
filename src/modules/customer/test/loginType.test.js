const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/login-type
// Desc : Customer login-type api should return
//        isFirstLogin flag and subscriptionPlan in result
// Case : Positive

describe("Case: Positive", () => {
  const payload = customerModuleConstants.loginType.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have property username", () => {
    expect(payload).to.have.property("username");
  });

  it("username should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.loginType.errorMessages.CLTE001.message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/login-type")
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
    assert.hasAllKeys(response.body.result, [
      "isFirstLogin",
      "subscriptionPlan",
    ]);
  });
});

// Api  : /customer/login-type
// Desc : Customer login-type api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.loginType.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have property username", () => {
    assert.doesNotHaveAllKeys(payload, ["username"]);
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/login-type")
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

// Api  : /customer/login-type
// Desc : Customer login-type api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.loginType.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;
  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have property username", () => {
    expect(payload).to.have.property("username");
  });
  it("username should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.loginType.errorMessages.CLTE001.message
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/login-type")
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
