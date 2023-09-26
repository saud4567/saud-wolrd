const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/unblock-login
// Desc : Customer unblock-login api should unblock customer login
//       and return message in result
// Case : Positive

describe("Case: Positive", () => {
  const payload = customerModuleConstants.unblockLogin.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have property username", () => {
    expect(payload).to.have.property("username");
  });

  it("username should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.unblockLogin.errorMessages.CULE001.message
    );
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/unblock-login")
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

// Api  : /customer/unblock-login
// Desc : Customer unblock-login api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.unblockLogin.TEST_CONSTANT
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
      .post("/customer/unblock-login")
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

// Api  : /customer/unblock-login
// Desc : Customer unblock-login api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.unblockLogin.TEST_CONSTANT
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
      customerModuleConstants.unblockLogin.errorMessages.CULE001.message
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/unblock-login")
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
