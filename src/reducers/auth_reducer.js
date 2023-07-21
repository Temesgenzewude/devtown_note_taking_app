
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
 
    default:
      return state;
  }
};

export default authReducer;
