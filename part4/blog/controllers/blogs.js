const blogRouter = require("express").Router();
const Blog = require("../models/blog");

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
      return response
        .status(400)
        .json({ error: "Title and Url must be provided" });
    }

    if (!information.likes) {
      information.likes = 0;
    }

    const user = await request.user;

    const newBlog = {
      title: information.title,
      author: information.author || user.name,
      url: information.url,
      likes: information.likes,
      user: user.id,
    };

    const blog = new Blog(newBlog);
    const returnedObj = await blog.save();

    user.blogs = [...user.blogs, returnedObj._id];
    await user.save();

    await returnedObj.populate("user");
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

    console.log("Blog to delete: ", blog);

    const user = await request.user;

    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );
    await user.save();

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "No such blog exists" });
    }

    const information = request.body;
    information.user = request.user;

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      information,
      {
        new: true,
      }
    );
    await updatedBlog.populate("user");
    console.log("Updated blog: ", updatedBlog);
    return response.json(updatedBlog).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
