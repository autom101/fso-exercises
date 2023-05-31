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
  } catch (error) {
    next(error);
  }
});

/* app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
}); */

blogRouter.put("/:id", async (request, response, next) => {
  console.log("Id received: ", response.params.id);
  console.log("Response body: ", response.body);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      response.params.id,
      response.body,
      {
        new: true,
      }
    );
    console.log("Updated blog became this: ", updatedBlog);
    response.json(updatedBlog).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
