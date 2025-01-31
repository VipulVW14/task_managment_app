import request from "supertest";
import app from "../src/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let token;

describe("Task Routes", () => {
  beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const user = await request(app).post("/api/auth/register").send({
      email: "testtask@example.com",
      password: "TestPass123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "testtask@example.com",
      password: "TestPass123",
    });
    token = loginRes.body.accessToken;
  });

  test("Create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Task description" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  test("Fetch all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Delete a task", async () => {
    const task = await prisma.task.findFirst();
    const res = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});