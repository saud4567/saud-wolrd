const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const customerModuleConstants = require("../constants");
const expect = chai.expect;
const assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("POST /customer/login-type", () => {
  const payload = customerModuleConstants.loginType.TEST_CONSTANT.PAYLOAD;
  it("It should return first time login or not", (done) => {
    expect(payload).to.be.a("object");
    expect(payload).to.have.property("username");
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.loginType.errorMessages.CLTE001.message
    );

    chai
      .request(server)
      .post("/customer/login-type")
      .send(payload)
      .end((err, response) => {
        if (response.status == 200) {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("result");
          response.body.result.should.have.property("isFirstLogin");
          response.body.result.should.have.property("subscriptionPlan");
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
