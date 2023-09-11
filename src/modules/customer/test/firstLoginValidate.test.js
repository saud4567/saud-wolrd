const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index.js");
const customerModuleConstants = require("../constants");
const expect = chai.expect;
const assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("POST /customer/first-login-validate", () => {
  const payload =
    customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD;
  it("It should validate and return isValid key", (done) => {
    expect(payload).to.be.a("object");
    expect(payload).to.include.keys(
      customerModuleConstants.firstTimeLoginValidate.TEST_CONSTANT.PAYLOAD_KEYS
    );
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

    chai
      .request(server)
      .post("/customer/first-login-validate")
      .send(payload)
      .end((err, response) => {
        if (response.status == 200) {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("result");
          response.body.result.should.have.property("isValid");
          done();
        }
        if (response.status == 400) {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("code");
          response.body.should.have.property("message");
          done();
        }
      });
  });
});
