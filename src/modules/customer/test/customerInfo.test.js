const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/info
// Desc : Customer info api should return
//       customer details in result
// Case : Positive-Payload with valid api-key and api-secret
describe("Case: Positive-Payload with valid api-key and api-secret", () => {
  const payload = customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isNotEmpty(
      payload.customer_id,
      customerModuleConstants.customerDetails.errorMessages.CCDE005.message
    );

    assert.isNotEmpty(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE006.message
    );
  });

  it("requested_data should be an array", () => {
    assert.isArray(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE007.message
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/info")
      .send(payload)
      .set({
        "api-key":
          customerModuleConstants.customerDetails.TEST_CONSTANT.VALID_API_KEY,
        "api-secret":
          customerModuleConstants.customerDetails.TEST_CONSTANT
            .VALID_API_SECRET,
      });
  });

  it("Should have authorization api-key in header", () => {
    response.request.header.should.have.property("api-key");
  });

  it("Should have authorization api-secret in header", () => {
    response.request.header.should.have.property("api-secret");
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

// Api  : /customer/info
// Desc : Customer info api should return
//       customer details in result
// Case : Payload with invalid api-key and api-secret
describe("Case: Payload with invalid api-key and api-secret", () => {
  const payload = customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isNotEmpty(
      payload.customer_id,
      customerModuleConstants.customerDetails.errorMessages.CCDE005.message
    );

    assert.isNotEmpty(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE006.message
    );
  });

  it("requested_data should be an array", () => {
    assert.isArray(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE007.message
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/info")
      .send(payload)
      .set({
        "api-key":
          customerModuleConstants.customerDetails.TEST_CONSTANT.INVALID_API_KEY,
        "api-secret":
          customerModuleConstants.customerDetails.TEST_CONSTANT
            .INVALID_API_SECRET,
      });
  });

  it("Should have api-key in header", () => {
    response.request.header.should.have.property("api-key");
  });

  it("Should have api-secret in header", () => {
    response.request.header.should.have.property("api-secret");
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

// Api  : /customer/info
// Desc : Customer info api should return
//        error message and code
// Case : Invalid Payload With Missing Keys
describe("Case : Invalid Payload With Missing Keys", () => {
  const payload =
    customerModuleConstants.customerDetails.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("if payload does not have mandetory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/info")
      .send(payload)
      .set({
        "api-key":
          customerModuleConstants.customerDetails.TEST_CONSTANT.VALID_API_KEY,
        "api-secret":
          customerModuleConstants.customerDetails.TEST_CONSTANT
            .VALID_API_SECRET,
      });
  });

  it("Should have api-key in header", () => {
    response.request.header.should.have.property("api-key");
  });

  it("Should have api-secret in header", () => {
    response.request.header.should.have.property("api-secret");
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

// Api  : /customer/info
// Desc : Customer info api should return
//        error message and code
// Case : Invalid Payload With Empty Values
describe("Case : Invalid Payload With Empty Values", () => {
  const payload =
    customerModuleConstants.customerDetails.TEST_CONSTANT
      .INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).should.be.a("object");
  });

  it("payload should have mandatory keys", () => {
    assert.containsAllKeys(
      payload,
      customerModuleConstants.customerDetails.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory keys should not be empty", () => {
    assert.isEmpty(
      payload.customer_id,
      customerModuleConstants.customerDetails.errorMessages.CCDE005.message
    );

    assert.isEmpty(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE006.message
    );
  });

  it("requested_data should be an array", () => {
    assert.isNotArray(
      payload.requested_data,
      customerModuleConstants.customerDetails.errorMessages.CCDE007.message
    );
  });
  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/customer/info")
      .send(payload)
      .set({
        "api-key":
          customerModuleConstants.customerDetails.TEST_CONSTANT.VALID_API_KEY,
        "api-secret":
          customerModuleConstants.customerDetails.TEST_CONSTANT
            .VALID_API_SECRET,
      });
  });

  it("Should have api-key in header", () => {
    response.request.header.should.have.property("api-key");
  });

  it("Should have api-secret in header", () => {
    response.request.header.should.have.property("api-secret");
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

// Api  : /customer/info
// Desc : Customer info api should return
//       customer details in result
// Case : Positive-Valid token
describe("Case : Positive-Valid token", () => {
  let response;
  before(async () => {
    response = await chai.request(server).post("/customer/info").set({
      Authorization:
        customerModuleConstants.customerDetails.TEST_CONSTANT.VALID_TOKEN,
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

// Api  : /customer/info
// Desc : Customer info api should return
//        error message and code
// Case : Payload with Invalid token
describe("Case : Invalid token", () => {
  let response;
  before(async () => {
    response = await chai.request(server).post("/customer/info").set({
      Authorization:
        customerModuleConstants.customerDetails.TEST_CONSTANT.INVALID_TOKEN,
    });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.have.property("Authorization");
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message, result", () => {
    assert.hasAllKeys(response.body, ["code", "message", "result"]);
  });
});
