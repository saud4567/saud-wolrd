const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const { expect, assert } = chai;
const customerModuleConstants = require("../constants");
chai.should();
chai.use(chaiHttp);

// Api  : /customer/validate
// Desc : Customer validate api should return
//        isValid flag and subscriptionPlan in result
// Case : Positive
describe("Case: Postive", () => {
  let response;

  // hit login/authenticate api and put token below

  before(async () => {
    response = await chai.request(server).get("/customer/validate").set({
      Authorization:
        customerModuleConstants.validate.TEST_CONSTANTS.VALID_TOKEN,
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

  it("Result object should contain redirectionURI key", () => {
    assert.hasAllKeys(response.body.result, ["isValid"]);
  });

  it("isValid key should be boolean", () => {
    assert.isBoolean(response.body.result.isValid);
  });
});

// Api  : /customer/validate
// Desc : Customer validate api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai.request(server).get("/customer/validate").set({
      Authorization:
        customerModuleConstants.validate.TEST_CONSTANTS.INVALID_TOKEN,
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

// Api  : /customer/validate
// Desc : Customer validate api should return
//        error message and code
// Case : Without token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai.request(server).get("/customer/validate").set({
      //  Authorization:customerModuleConstants.validate.TEST_CONSTANTS.INVALID_TOKEN,
    });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.not.have.property("Authorization");
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

// Api  : /customer/validate
// Desc : Customer validate api should return
//        error message and code
// Case : token with empty value
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai.request(server).get("/customer/validate").set({
      Authorization: "",
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

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});
