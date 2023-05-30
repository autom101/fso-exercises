const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    if (!blog.likes) {
      blog.likes = 0;
    }

    try {
      const returnedObj = await blog.save();
      response.status(201).json(returnedObj);
    } catch (error) {
      next(error);
    }
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
