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
    _id: "5a422a85asdknc7336234d17f7",
    title: "Valid Blog",
    author: "Who dis",
    url: "https://asdf.com/",
    likes: 7,
    __v: 0,
  };

  await api.post("/api/blogs").send(validBlog);
  // .expect(201)
  // .expect("Content-Type", /application\/json/);

  const response = await Blog.find({});
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

  expect(response.body.map((obj) => obj.author)).toContain(validBlog.author);
});

afterAll(async () => {
  await mongoose.connection.close();
});
