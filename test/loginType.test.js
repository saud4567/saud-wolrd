let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index.js");
let expect = chai.expect;
let assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("Login Type API", () => {
  const payload = {
    username: "shalaka.devarde+11@techstalwarts.com",
  };
  describe("POST /customer/login-type", () => {
    it("It should return first time login or not", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.have.property("username");
      assert.isNotEmpty(payload.username, "username is required");

      chai
        .request(server)
        .post("/customer/login-type")
        .send(payload)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("result");
          response.body.result.should.have.property("isFirstLogin");
          response.body.result.should.have.property("subscriptionPlan");
          done();
        });
    });
  });
});
