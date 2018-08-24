const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const {user, populateUser} = require("./seed");

beforeEach(populateUser);

describe('get verion', () => {
  it('should return verion of api', (done) => {
      request(app)
      .get("/api")
      .expect(200)
      .end(done);
  });
});

describe('get /user/me', () => {
  it('should return user id authenticated', (done) => {
      request(app)
      .get("/api/users/me")
      .set("x-auth", user[0]["tokens"][0]["token"])
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(user[0]._id.toHexString());
        expect(res.body.email).toBe(user[0].email);
      })
      .end(done);
  });
  it('should did not return user id  if not authenticated', (done) => {
      request(app)
      .get("/api/users/me")
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
