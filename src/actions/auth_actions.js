// authActions.js
import axios from "axios";
import jwtDecode from "jwt-decode";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/register", userData);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    const decodedToken = jwtDecode(token);
    dispatch({ type: "SET_CURRENT_USER", payload: decodedToken });
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", userData);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    const decodedToken = jwtDecode(token);
    dispatch({ type: "SET_CURRENT_USER", payload: decodedToken });
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch({ type: "LOGOUT_USER" });
};
