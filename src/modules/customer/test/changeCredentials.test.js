const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/change-credentials
// Desc : Customer change-credentials api should change credentials and return
//       success message
// Case : Positive
describe("Case: Postive", () => {
  const payload =
    customerModuleConstants.changeCredentials.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.changeCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isNotEmpty(
      payload.reset_mode,
      customerModuleConstants.changeCredentials.errorMessages.CCCE001.message
    );

    assert.isNotEmpty(
      payload.changed_credentials,
      customerModuleConstants.changeCredentials.errorMessages.CCCE002.message
    );
  });

  it("reset_mode should have valid value", () => {
    expect(payload.reset_mode).to.be.oneOf(
      customerModuleConstants.changeCredentials.TEST_CONSTANT.RESET_MODE
    );
  });
  // hit login/authenticate api and put token below

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/change-credentials")
      .send(payload)
      .set({
        Authorization:
          customerModuleConstants.changeCredentials.TEST_CONSTANT.VALID_TOKEN,
      });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.have.property("Authorization");
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

// Api  : /customer/change-credentials
// Desc : Customer change-credentials api should return
//        error message and code
// Case : Payload with Invalid token
describe("Case : Invalid token", () => {
  const payload =
    customerModuleConstants.changeCredentials.TEST_CONSTANT.PAYLOAD;
  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/change-credentials")
      .send(payload)
      .set({
        Authorization:
          customerModuleConstants.changeCredentials.TEST_CONSTANT.INVALID_TOKEN,
      });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.have.property("Authorization");
  });

  it("Should have status code of 401", () => {
    expect(response).to.have.status(401);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});

// Api  : /customer/change-credentials
// Desc : Customer change-credentials api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.changeCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have mandetory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.changeCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/change-credentials")
      .send(payload)
      .set({
        Authorization:
          customerModuleConstants.changeCredentials.TEST_CONSTANT.VALID_TOKEN,
      });
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
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.changeCredentials.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.changeCredentials.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.reset_mode,
      customerModuleConstants.changeCredentials.errorMessages.CCCE001.message
    );

    assert.isEmpty(
      payload.changed_credentials,
      customerModuleConstants.changeCredentials.errorMessages.CCCE002.message
    );
  });

  it("reset_mode should have valid value", () => {
    expect(payload.reset_mode).to.not.be.oneOf(
      customerModuleConstants.changeCredentials.TEST_CONSTANT.RESET_MODE
    );
  });
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/change-credentials")
      .send(payload)
      .set({
        Authorization:
          customerModuleConstants.changeCredentials.TEST_CONSTANT.VALID_TOKEN,
      });
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
