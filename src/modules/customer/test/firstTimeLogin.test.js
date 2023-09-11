const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const customerModuleConstants = require("../constants");
const expect = chai.expect;
const assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("Login Type API", () => {
  const payload = {
    username: "shalaka.devarde+6@techstalwarts.com",
    two_fa: "CEBPA1214P",
    mpin: "new@1234",
  };
  describe("POST /customer/first-login", () => {
    it("It should login and return token", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.include.keys("username", "two_fa");
      expect(payload).to.include.any.keys("mpin", "password", "biometric").to
        .not.be.null;
      assert.isNotEmpty(payload.username, "username is required");
      assert.isNotEmpty(
        payload.two_fa,
        "two factor authentication key is required"
      );

      chai
        .request(server)
        .post("/customer/first-login")
        .send(payload)
        .end((err, response) => {
          if (response.status == 200) {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("result");
            response.body.result.should.have.property("token");
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
});
