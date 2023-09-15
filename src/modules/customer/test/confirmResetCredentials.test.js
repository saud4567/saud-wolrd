const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/confirm-reset
// Desc : Customer confirm-reset api should reset the credentials and return
//        message
// Case : Positive

describe("Case: Positive", () => {
  const payload =
    customerModuleConstants.confirmResetCredentials.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.confirmResetCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.reset_request_id,
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE001
        .message
    );
    assert.isNotEmpty(
      payload.reset_credentials,
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE002
        .message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/confirm-reset")
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
});

// Api  : /customer/confirm-reset
// Desc : Customer confirm-reset api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.confirmResetCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have property username", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.confirmResetCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/confirm-reset")
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

// Api  : /customer/confirm-reset
// Desc : Customer confirm-reset api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.confirmResetCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.confirmResetCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.reset_request_id,
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE001
        .message
    );
    assert.isEmpty(
      payload.reset_credentials,
      customerModuleConstants.confirmResetCredentials.errorMessages.CCRCE002
        .message
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/confirm-reset")
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

// Api  : /customer/confirm-reset
// Desc : Customer confirm-reset api should return
//        error message and code
// Case : Payload With Expired Reset Request
describe("Case : Invalid Payload With Expired Reset Request", () => {
  const payload =
    customerModuleConstants.confirmResetCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EXPIRED_RESET_REQUEST;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.confirmResetCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/confirm-reset")
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
