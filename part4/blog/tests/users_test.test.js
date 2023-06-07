const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./blog_helper");
const User = require("../models/user");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const username = "testing 1111111";
  const name = "testing Name";
  const passwordHash = await bcrypt.hash("abcde", 10);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  await newUser.save();
});

describe("tests with one user in the database", () => {
  test("Successfully create one user", async () => {
    const usersBefore = await helper.findUsersInDatabase();

    const newUser = {
      username: "ho0988",
      name: "2 testing new Name",
      password: "abcdefg",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.findUsersInDatabase();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
  });

  test("Attempts to create a user with an already existing username will yield a 400 status", async () => {
    const usersBefore = await helper.findUsersInDatabase();

    const newUser = {
      username: "testing 1111111",
      name: "2 testing new Name",
      password: "abcdefg",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAfter = await helper.findUsersInDatabase();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });
}, 15000);

afterAll(async () => {
  await mongoose.connection.close();
});
