const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/initiate-reset
// Desc : Customer initiate-reset api should return
//        requestId in result
// Case : Positive

describe("Case: Positive", () => {
  const payload =
    customerModuleConstants.initiateResetCredentials.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.initiateResetCredentials.TEST_CONSTANT
        .PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE001
        .message
    );
    assert.isNotEmpty(
      payload.two_fa,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE002
        .message
    );

    assert.isNotEmpty(
      payload.reset_mode,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE003
        .message
    );
  });

  it("reset_mode should have valid value", () => {
    expect(payload.reset_mode).to.be.oneOf(
      customerModuleConstants.initiateResetCredentials.TEST_CONSTANT.RESET_MODE
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/initiate-reset")
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

  it("Result object should contain resetRequestId", () => {
    assert.hasAllKeys(response.body.result, ["resetRequestId"]);
  });
});

// Api  : /customer/initiate-reset
// Desc : Customer initiate-reset api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.initiateResetCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have property username", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.initiateResetCredentials.TEST_CONSTANT
        .PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/initiate-reset")
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

// Api  : /customer/initiate-reset
// Desc : Customer initiate-reset api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.initiateResetCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.initiateResetCredentials.TEST_CONSTANT
        .PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE001
        .message
    );
    assert.isEmpty(
      payload.two_fa,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE002
        .message
    );

    assert.isEmpty(
      payload.reset_mode,
      customerModuleConstants.initiateResetCredentials.errorMessages.CIRCE003
        .message
    );
  });

  it("reset_mode should have valid value", () => {
    expect(payload.reset_mode).to.not.be.oneOf(
      customerModuleConstants.initiateResetCredentials.TEST_CONSTANT.RESET_MODE
    );
  });
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/initiate-reset")
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
