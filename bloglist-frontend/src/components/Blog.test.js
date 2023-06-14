import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("title and author are defined", async () => {
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
  const modifyLikes = jest.fn();

  render(<Blog blog={blog} remove={removeBlog} modifyLikes={modifyLikes} />);

  const blogTitle = screen.getByText("a random title", { exact: false });
  const blogAuthor = screen.getByText("some random author", { exact: false });

  expect(blogTitle).toBeDefined();
  expect(blogAuthor).toBeDefined();
});

test("url and likes are not initially defined", async () => {
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
  const modifyLikes = jest.fn();

  render(<Blog blog={blog} remove={removeBlog} modifyLikes={modifyLikes} />);

  const blogLikes = screen.queryByText("7", { equals: false });
  const blogUrl = screen.queryByText("url", { equals: false });

  expect(blogLikes).toBeNull();
  expect(blogUrl).toBeNull();
});

test("url and likes are not defined after the expand button is clicked", async () => {
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
  const modifyLikes = jest.fn();

  const user = userEvent.setup();
  render(<Blog blog={blog} remove={removeBlog} modifyLikes={modifyLikes} />);

  const blogLikes = screen.queryByText("7", { equals: false });
  const blogUrl = screen.queryByText("url", { equals: false });

  expect(blogLikes).toBeNull();
  expect(blogUrl).toBeNull();

  const showButton = screen.queryByText("Expand");
  await user.click(showButton);

  expect(blogLikes).toBeDefined();
  expect(blogUrl).toBeDefined();
});
