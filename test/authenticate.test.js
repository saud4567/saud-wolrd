let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index.js");
let expect = chai.expect;
let assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("Authentication API", () => {
  const payload = {
    username: "shalaka.devarde+11@techstalwarts.com",
    mpin: "123456",
  };
  describe("POST /customer/authenticate", () => {
    it("It should authenticate and return token", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.have.property("username");
      expect(payload).to.include.any.keys("mpin", "password", "biometric").to
        .not.be.null;
      assert.isNotEmpty(payload.username, "username is required");

      chai
        .request(server)
        .post("/customer/authenticate")
        .send(payload)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("result");
          response.body.result.should.have.property("token");
          done();
        });
    });
  });
});
