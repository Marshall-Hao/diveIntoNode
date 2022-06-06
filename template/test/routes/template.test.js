const app = require("../../server/index");

const request = require("supertest")(app);

const assert = require("power-assert");

describe("test routes", () => {
  it("GET /xhr/v1/template", (done) => {
    request
      .get("/xhr/v1/template")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 200);
        assert(res.body.msg === "success");
        assert(
          Array.isArray(res.body.data),
          "should be an array"
        );
        done();
      });
  });

  it("GET /xhr/v1/template/:id", (done) => {
    request
      .get("/xhr/v1/template/629daab884e550c1d825d8f6")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 200);
        assert(res.body.msg === "success");
        assert(
          typeof res.body.data === "object",
          "should be an object"
        );
        assert(
          res.body.data.name === "wtf",
          "should be same"
        );
        done();
      });
  });

  it("GET /xhr/v1/template/:id bad id", (done) => {
    request
      .get("/xhr/v1/template/629daab884e550c1d825d8f6a")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 400);
        done();
      });
  });

  it("POST /xhr/v1/template", (done) => {
    const temp = {
      name: "molcha-test",
      template: "<h2>hello ${name}</h2>",
      data: "{name: mocha}",
    };

    request
      .post("/xhr/v1/template", temp)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 200);
        assert(res.body.msg === "success");
        assert(
          typeof res.body.data === "object",
          "should be an object"
        );
        assert(
          res.body.data._id !== undefined,
          "should be id"
        );
        done();
      });
  });

  it("PUT /xhr/v1/template/:id", (done) => {
    const temp = {
      name: "molcha-test",
      template: "<h2>hello ${name}</h2>",
      data: "{name: mocha}",
    };

    request
      .put(
        "/xhr/v1/template/629daab884e550c1d825d8f6",
        temp
      )
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 200);
        assert(res.body.msg === "success");
        assert(
          typeof res.body.data === "object",
          "should be an object"
        );
        console.log(res.body.data.name);
        assert(
          res.body.data.name === "wtf",
          "should be same"
        );
        done();
      });
  });

  it("DELETE /xhr/v1/template/:id", (done) => {
    request
      .delete("/xhr/v1/template/629daab884e550c1d825d8f6")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.code === 200);
        assert(res.body.msg === "deleted");
        done();
      });
  });
});
