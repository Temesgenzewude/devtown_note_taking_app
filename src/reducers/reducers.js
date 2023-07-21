// reducers.js
const initialState = {
  notes: [],
  filteredNotes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NOTE_SUCCESS":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "CREATE_NOTE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_NOTES_SUCCESS":
      return {
        ...state,
        notes: action.payload,
      };
    case "FETCH_NOTES_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "SEARCH_NOTES_SUCCESS":
      return {
        ...state,
        filteredNotes: action.payload,
      };
    case "FILTER_NOTES_SUCCESS":
      return {
        ...state,
        filteredNotes: action.payload,
      };
    // Add additional cases for updating and deleting notes if required.
    default:
      return state;
  }
};

export default noteReducer;
