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

  it("POST /todos should create a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "learn testing" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("learn testing");
    expect(res.body.completed).toBe(false);
  });

  it("POST /todos should return 400 if title is missing", async () => {
  const res = await request(app).post("/todos").send({});

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("title is required");
  });
});
