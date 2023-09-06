let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index.js");

//Assertion Style
let expect = chai.expect;
let assert = chai.assert;
chai.should();

chai.use(chaiHttp);

describe("Authentication API", () => {
  /**
   * Test the GET route
   */
  //   describe("GET /api/tasks", () => {
  //     it("It should GET all the tasks", (done) => {
  //       chai
  //         .request(server)
  //         .get("/api/tasks")
  //         .end((err, response) => {
  //           response.should.have.status(200);
  //           response.body.should.be.a("array");
  //           response.body.length.should.be.eq(3);
  //           done();
  //         });
  //     });

  //     it("It should NOT GET all the tasks", (done) => {
  //       chai
  //         .request(server)
  //         .get("/api/task")
  //         .end((err, response) => {
  //           response.should.have.status(404);
  //           done();
  //         });
  //     });
  //   });

  /**
   * Test the GET (by id) route
   */
  //   describe("GET /api/tasks/:id", () => {
  //     it("It should GET a task by ID", (done) => {
  //       const taskId = 1;
  //       chai
  //         .request(server)
  //         .get("/api/tasks/" + taskId)
  //         .end((err, response) => {
  //           response.should.have.status(200);
  //           response.body.should.be.a("object");
  //           response.body.should.have.property("id");
  //           response.body.should.have.property("name");
  //           response.body.should.have.property("completed");
  //           response.body.should.have.property("id").eq(1);
  //           done();
  //         });
  //     });

  //     it("It should NOT GET a task by ID", (done) => {
  //       const taskId = 123;
  //       chai
  //         .request(server)
  //         .get("/api/tasks/" + taskId)
  //         .end((err, response) => {
  //           response.should.have.status(404);
  //           response.text.should.be.eq(
  //             "The task with the provided ID does not exist."
  //           );
  //           done();
  //         });
  //     });
  //   });

  /**
   * Test the POST route
   */
  const payload = {
    username: "shalaka.devarde+6@techstalwarts.com",
    mpin: "new@1234",
  };
  describe("POST /customer/authenticate", () => {
    it("It should authenticate and return token", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.have.property("username");
      expect(payload).to.have.property("mpin");
      //  assert.isNotNull(payload.username, "username is required");
      //  assert.isNotNull(payload.mpin, "mpin is required");
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

    it("Should show message Username is required", (done) => {
      expect(payload).to.be.a("object");
      expect(payload).to.have.property("username");
      assert.isNotNull(payload.username, "username is required");

      chai
        .request(server)
        .post("/customer/authenticate")
        .send(payload)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          done();
        });
    });

    // it("It should NOT POST a new task without the name property", (done) => {
    //   const task = {
    //     completed: false,
    //   };
    //   chai
    //     .request(server)
    //     .post("/api/tasks")
    //     .send(task)
    //     .end((err, response) => {
    //       response.should.have.status(400);
    //       response.text.should.be.eq(
    //         "The name should be at least 3 chars long!"
    //       );
    //       done();
    //     });
    // });
  });
});
