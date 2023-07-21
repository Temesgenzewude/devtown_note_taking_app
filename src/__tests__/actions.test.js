// actions.test.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createNote, fetchNotes } from "./actions";

const mockAxios = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

test("creates CREATE_NOTE_SUCCESS when creating a note", async () => {
  const newNote = { title: "Test Note", content: "<p>Test content</p>" };
  const responseData = { id: 1, ...newNote };
  mockAxios.onPost("/api/notes").reply(200, responseData);

  const expectedActions = [
    { type: "CREATE_NOTE_SUCCESS", payload: responseData },
  ];

  const store = mockStore({});
  await store.dispatch(createNote(newNote));
  expect(store.getActions()).toEqual(expectedActions);
});

test("creates FETCH_NOTES_SUCCESS when fetching notes", async () => {
  const notesData = [
    { id: 1, title: "Note 1", content: "<p>Content 1</p>" },
    { id: 2, title: "Note 2", content: "<p>Content 2</p>" },
  ];
  mockAxios.onGet("/api/notes").reply(200, notesData);

  const expectedActions = [{ type: "FETCH_NOTES_SUCCESS", payload: notesData }];

  const store = mockStore({});
  await store.dispatch(fetchNotes());
  expect(store.getActions()).toEqual(expectedActions);
});
