const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./blog_helper");
const Blog = require("../models/Blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogPromiseArray = helper.initialBlogs
    .map((blog) => new Blog(blog))
    .map((blog) => blog.save());

  await Promise.all(blogPromiseArray);
}, 20000);

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
    author: "Who dis",
    url: "https://asdf.com/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(validBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

  expect(response.body.map((obj) => obj.author)).toContain(validBlog.author);
});

test("likes value defaults to 0 when missing from a request", async () => {
  const blogMissingLikes = {
    title: "Valid Blog",
    author: "Who dis",
    url: "https://asdf.com/",
  };

  await api
    .post("/api/blogs")
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

  await api.post("/api/blogs").send(blogMissingTitle).expect(400);

  const blogMissingUrl = {
    title: "Missing url",
    author: "Who dis",
  };

  await api.post("/api/blogs").send(blogMissingUrl).expect(400);
});

test("a POST request missing title/url is not added to database", async () => {
  const blogMissingTitle = {
    author: "Who dis",
    url: "Missing title",
  };

  await api.post("/api/blogs").send(blogMissingTitle).expect(400);

  const blogMissingUrl = {
    title: "Missing url",
    author: "Who dis",
  };

  await api.post("/api/blogs").send(blogMissingUrl).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("deletion of a blog with correct id provided returns status 204", async () => {
  const noteToDeleteId = helper.initialBlogs[0]._id;
  await api.delete(`/api/blogs/${noteToDeleteId}`).expect(204);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length - 1);

  expect(response.body.map((blog) => blog.id)).not.toContain(noteToDeleteId);
});

afterAll(async () => {
  await mongoose.connection.close();
});
