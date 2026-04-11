const request = require("supertest");
const app = require("../app/index");

describe("API Tests", () => {
  it("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("GET /health should return ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).toBe("ok");
  });

  it("GET /todos should return array", async () => {
    const res = await request(app).get("/todos");
    expect(Array.isArray(res.body)).toBe(true);
  });
});
