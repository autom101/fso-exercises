const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const information = request.body;

  if (!information.title || !information.url) {
    response.status(400).end();
  } else {
    if (!information.likes) {
      information.likes = 0;
    }

    try {
      const user = await User.findOne({});

      const newBlog = {
        title: information.title,
        author: user.name,
        url: information.url,
        likes: information.likes,
        user: user,
      };

      const blog = new Blog(newBlog);
      const returnedObj = await blog.save();

      user.blogs.push(returnedObj);
      await user.save();

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
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.json(updatedBlog).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
