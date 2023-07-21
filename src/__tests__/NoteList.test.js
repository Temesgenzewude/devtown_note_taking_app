// NoteList.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NoteList from "./NoteList";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

test("renders loading state and then notes", async () => {
  const initialState = {
    notes: [
      { id: 1, title: "Note 1", content: "<p>Content 1</p>" },
      { id: 2, title: "Note 2", content: "<p>Content 2</p>" },
    ],
  };
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <NoteList />
    </Provider>
  );

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();

  await waitFor(() => {
    const note1Element = screen.getByText("Note 1");
    const note2Element = screen.getByText("Note 2");
    expect(note1Element).toBeInTheDocument();
    expect(note2Element).toBeInTheDocument();
  });
});

test("renders message for no notes found", async () => {
  const initialState = {
    notes: [],
  };
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <NoteList />
    </Provider>
  );

  const noNotesElement = screen.getByText(/No notes found./i);
  expect(noNotesElement).toBeInTheDocument();
});
