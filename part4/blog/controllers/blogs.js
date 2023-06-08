const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const information = request.body;

    if (!information.title || !information.url) {
      response.status(400).end();
    } else if (!information.likes) {
      information.likes = 0;
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(decodedToken.id);

    const newBlog = {
      title: information.title,
      author: user.name,
      url: information.url,
      likes: information.likes,
      user: user.id,
    };

    const blog = new Blog(newBlog);
    const returnedObj = await blog.save();

    user.blogs = [...user.blogs, returnedObj._id];
    await user.save();

    response.status(201).json(returnedObj);
  } catch (error) {
    next(error);
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
