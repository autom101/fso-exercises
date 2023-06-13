const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    return response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    console.log("request arrives here: ", request.body);
    const information = request.body;

    if (!information || !information.title || !information.url) {
      console.log("and goes in here");
      return response
        .status(400)
        .json({ error: "Title and Url must be provided" });
    }
    console.log("shouldn't be here");
    if (!information.likes) {
      information.likes = 0;
    }

    const user = await request.user;

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

    return response.status(201).json(returnedObj);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "No such blog exists" });
    }

    const user = await request.user;

    const blogUserId = blog.user.toString();
    if (blogUserId !== user.id) {
      return response
        .status(401)
        .json({ error: "Incorrect username or password" });
    }

    await Blog.findByIdAndRemove(request.params.id);

    user.blogs = user.blogs.filter((blog) => blog !== blogUserId);
    await user.save();

    return response.status(204).end();
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
    return response.json(updatedBlog).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
