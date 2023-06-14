import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

let mockHandler;

beforeEach(() => {
  mockHandler = jest.fn();
  render(<NewBlog addBlog={mockHandler} />);
});

test("Check that addBlog received correct details when it is called", async () => {
  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText("enter title here");
  const authorInput = screen.getByPlaceholderText("enter author here");
  const urlInput = screen.getByPlaceholderText("enter url here");

  await user.type(titleInput, "my title");
  await user.type(authorInput, "my author");
  await user.type(urlInput, "my url");

  const submitButton = screen.queryByText("Submit");

  await user.click(submitButton);

  expect(mockHandler.mock.calls[0][0].title).toBe("my title");
  expect(mockHandler.mock.calls[0][0].author).toBe("my author");
  expect(mockHandler.mock.calls[0][0].url).toBe("my url");
});
