const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/authenticate
// Desc : Customer authenticate api should return
//        JWT token in result
// Case : Positive

describe("Case: Positive", () => {
  const payload =
    customerModuleConstants.authentication.TEST_CONSTANT.VALID_PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have property username", () => {
    expect(payload).to.have.property("username");
  });

  it("payload should contain any one of mpin or password or biometric", () => {
    assert.hasAnyKeys(
      payload,
      customerModuleConstants.authentication.TEST_CONSTANT.PASSWORD_KEYS
    );
  });

  it("username should not be empty", () => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.authentication.errorMessages.CAE001.message
    );
  });

  it("check if mpin or password or biometric present in payload should not be empty", () => {
    if (payload.hasOwnProperty("mpin")) {
      assert.isNotEmpty(
        payload.mpin,
        customerModuleConstants.authentication.errorMessages.CAE017.message
      );
    }

    if (payload.hasOwnProperty("biometric")) {
      assert.isNotEmpty(
        payload.biometric,
        customerModuleConstants.authentication.errorMessages.CAE018.message
      );
    }
    if (payload.hasOwnProperty("password")) {
      assert.isNotEmpty(
        payload.password,
        customerModuleConstants.authentication.errorMessages.CAE013.message
      );
    }
  });

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/authenticate")
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

// Api  : /customer/authenticate
// Desc : Customer authenticate api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.authentication.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have property username", () => {
    // expect(payload).to.have.property("username");
    assert.doesNotHaveAllKeys(payload, ["username"]);
  });

  it("if payload does not contain any one of mpin or password or biometric", () => {
    assert.doesNotHaveAnyKeys(
      payload,
      customerModuleConstants.authentication.TEST_CONSTANT.PASSWORD_KEYS
    );
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/authenticate")
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

// Api  : /customer/authenticate
// Desc : Customer authenticate api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.authentication.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("username should not be empty", () => {
    assert.isEmpty(
      payload.username,
      customerModuleConstants.authentication.errorMessages.CAE001.message
    );
  });

  it("check if mpin or password or biometric present in payload should not be empty", () => {
    if (payload.hasOwnProperty("mpin")) {
      assert.isEmpty(
        payload.mpin,
        customerModuleConstants.authentication.errorMessages.CAE017.message
      );
    }

    if (payload.hasOwnProperty("biometric")) {
      assert.isEmpty(
        payload.biometric,
        customerModuleConstants.authentication.errorMessages.CAE018.message
      );
    }
    if (payload.hasOwnProperty("password")) {
      assert.isEmpty(
        payload.password,
        customerModuleConstants.authentication.errorMessages.CAE013.message
      );
    }
  });

  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/authenticate")
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
