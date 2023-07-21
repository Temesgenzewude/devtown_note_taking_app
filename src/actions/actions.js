// actions.js
import axios from "axios";

export const createNote = (noteData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/notes", noteData);
    dispatch({ type: "CREATE_NOTE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "CREATE_NOTE_FAILURE", payload: error.message });
  }
};

export const fetchNotes = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/notes");
    dispatch({ type: "FETCH_NOTES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_NOTES_FAILURE", payload: error.message });
  }
};

export const searchNotes = (searchTerm) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/notes/search?q=${searchTerm}`);
    dispatch({ type: "SEARCH_NOTES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "SEARCH_NOTES_FAILURE", payload: error.message });
  }
};

export const filterNotes = (filterOptions) => async (dispatch) => {
  try {
    const response = await axios.post("/api/notes/filter", filterOptions);
    dispatch({ type: "FILTER_NOTES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FILTER_NOTES_FAILURE", payload: error.message });
  }
};

// Add additional actions for updating and deleting notes if required.
