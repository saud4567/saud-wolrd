const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index.js");
const customerModuleConstants = require("../constants");
const expect = chai.expect;
const assert = chai.assert;
chai.should();
chai.use(chaiHttp);

describe("POST /customer/register", () => {
  const payload = customerModuleConstants.authentication.TEST_CONSTANT.PAYLOAD;
  it("check if payload is in object format", (done) => {
    expect(payload).to.be.a("object");
    chai
      .request(server)
      .post("/customer/authenticate")
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
  it("check if username is present in payload", (done) => {
    expect(payload).to.have.property("username");
    chai
      .request(server)
      .post("/customer/authenticate")
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
  it("check if mpin or password or biometric present in payload", (done) => {
    expect(payload).to.include.any.keys(
      customerModuleConstants.authentication.TEST_CONSTANT.PASSWORD_KEYS
    ).to.not.be.null;
    chai
      .request(server)
      .post("/customer/authenticate")
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
  it("check if username is not empty", (done) => {
    assert.isNotEmpty(
      payload.username,
      customerModuleConstants.authentication.errorMessages.CAE001.message
    );
    chai
      .request(server)
      .post("/customer/authenticate")
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

  it("check if mpin or password or biometric present in payload should not be empty", (done) => {
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
    chai
      .request(server)
      .post("/customer/authenticate")
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
