const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      next(error);
    });
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const returnedObj = await blog.save();
    response.status(201).json(returnedObj);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
