import request from "supertest";
import app from "../src/server"; // Import Express app
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Auth Routes", () => {
  let testUser = { email: "testuser@example.com", password: "TestPass123" };

  beforeAll(async () => {
    await prisma.user.deleteMany(); // Clear test DB before tests
  });

  test("Register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created");
  });

  test("Login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  test("Fail login with invalid password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "WrongPassword",
    });
    expect(res.statusCode).toBe(401);
  });
});
