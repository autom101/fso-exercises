import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

let modifyLikes;
beforeEach(() => {
  const blog = {
    title: "a random title",
    author: "some random author",
    user: {
      name: "name",
      id: "912903123sla;jc",
    },
    id: "0293ufjalskdf023f",
    likes: 7,
    url: "url",
  };

  const removeBlog = jest.fn();
  modifyLikes = jest.fn();

  render(<Blog blog={blog} remove={removeBlog} modifyLikes={modifyLikes} />);
});

test("title and author are defined", async () => {
  const blogTitle = screen.getByText("a random title", { exact: false });
  const blogAuthor = screen.getByText("some random author", { exact: false });

  expect(blogTitle).toBeDefined();
  expect(blogAuthor).toBeDefined();
});

test("url and likes are not initially defined", async () => {
  const blogLikes = screen.queryByText("7", { equals: false });
  const blogUrl = screen.queryByText("url", { equals: false });

  expect(blogLikes).toBeNull();
  expect(blogUrl).toBeNull();
});

test("url and likes are defined after the expand button is clicked", async () => {
  const user = userEvent.setup();

  const blogLikes = screen.queryByText("7", { equals: false });
  const blogUrl = screen.queryByText("url", { equals: false });

  expect(blogLikes).toBeNull();
  expect(blogUrl).toBeNull();

  const showButton = screen.queryByText("Expand");
  await user.click(showButton);

  expect(blogLikes).toBeDefined();
  expect(blogUrl).toBeDefined();
});

test("modifyLikes function is called when like button is clicked", async () => {
  const user = userEvent.setup();

  const blogLikes = screen.queryByText("7", { equals: false });
  const blogUrl = screen.queryByText("url", { equals: false });

  expect(blogLikes).toBeNull();
  expect(blogUrl).toBeNull();

  const showButton = screen.queryByText("Expand", { equals: false });
  await user.click(showButton);

  expect(blogLikes).toBeDefined();
  expect(blogUrl).toBeDefined();

  const likeButton = screen.queryByText("like", { equals: false });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(modifyLikes.mock.calls).toHaveLength(2);
});
