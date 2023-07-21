import React from "react";
import { render, screen } from "@testing-library/react";
import Note from "./Note";

test("renders note title and content", () => {
  const title = "Test Note";
  const content = "<p>Test content</p>";
  render(<Note title={title} content={content} />);
  const titleElement = screen.getByText(title);
  const contentElement = screen.getByText("Test content", { selector: "p" });
  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});

test("renders default title if title prop is not provided", () => {
  const content = "<p>Test content</p>";
  render(<Note content={content} />);
  const defaultTitleElement = screen.getByText(/Untitled Note/i);
  expect(defaultTitleElement).toBeInTheDocument();
});

test("renders default content if content prop is not provided", () => {
  const title = "Test Note";
  render(<Note title={title} />);
  const defaultContentElement = screen.getByText(/Empty note content/i);
  expect(defaultContentElement).toBeInTheDocument();
});
