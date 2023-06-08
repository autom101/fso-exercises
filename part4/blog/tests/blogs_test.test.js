const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./blog_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogPromiseArray = helper.initialBlogs
    .map((blog) => new Blog(blog))
    .map((blog) => blog.save());

  await Promise.all(blogPromiseArray);

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

describe("Testing blog router", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("/api/blogs returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);

  test("returned blogs have an id attribute", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  test("making an HTTP POST request creates a new blog", async () => {
    const validBlog = {
      title: "Valid Blog",
      url: "https://asdf.com/",
      likes: 7,
    };

    const userLogin = await api
      .post("/api/login")
      .send({
        username: "testing 1111111",
        name: "testing Name",
        password: "abcde",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const token = "Bearer " + userLogin.body.token;

    await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(validBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    expect(response.body.map((obj) => obj.author)).toContain("testing Name");
  });

  test("likes value defaults to 0 when missing from a request", async () => {
    const blogMissingLikes = {
      title: "Valid Blog",
      author: "Who dis",
      url: "https://asdf.com/",
    };

    const userLogin = await api
      .post("/api/login")
      .send({
        username: "testing 1111111",
        name: "testing Name",
        password: "abcde",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const token = "Bearer " + userLogin.body.token;

    await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(blogMissingLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    expect(response.body[helper.initialBlogs.length].likes).toEqual(0);
  });

  test("a post request missing title or url returns status 400", async () => {
    const blogMissingTitle = {
      author: "Who dis",
      url: "Missing title",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: " " })
      .send(blogMissingTitle)
      .expect(400);

    const blogMissingUrl = {
      title: "Missing url",
      author: "Who dis",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: " " })
      .send(blogMissingUrl)
      .expect(400);
  });

  test("a POST request missing title/url is not added to database", async () => {
    const blogMissingTitle = {
      author: "Who dis",
      url: "Missing title",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: " " })
      .send(blogMissingTitle)
      .expect(400);

    const blogMissingUrl = {
      title: "Missing url",
      author: "Who dis",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: " " })
      .send(blogMissingUrl)
      .expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("deletion of a blog with correct id provided returns status 204", async () => {
    const userLogin = await api
      .post("/api/login")
      .send({
        username: "testing 1111111",
        name: "testing Name",
        password: "abcde",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const token = "Bearer " + userLogin.body.token;

    const validBlog = {
      title: "Valid Blog",
      url: "https://asdf.com/",
      likes: 7,
    };

    const returnedBlog = await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(validBlog);

    const blogToDelete = returnedBlog.body;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token })
      .expect(204);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);

    expect(response.body.map((blog) => blog.id)).not.toContain(blogToDelete.id);
  });

  test("modifying a blog's likes is successful", async () => {
    let initialNoteLikes = helper.initialBlogs[0].likes; // Use let for mutable variable
    const noteId = helper.initialBlogs[0]._id;
    helper.initialBlogs[0].likes++;

    await api
      .put(`/api/blogs/${noteId}`)
      .send(helper.initialBlogs[0])
      .expect(200);

    initialNoteLikes++; // Update the initialNoteLikes variable

    const response = await api.get("/api/blogs");
    expect(response.body[0].likes).toBe(initialNoteLikes);
  }, 20000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
