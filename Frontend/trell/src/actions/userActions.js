import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(process.env.REACT_APP_LOGIN_URL);
    const data = await axios.post(
      process.env.REACT_APP_LOGIN_URL,
      { username: username, password: password },
      config
    );
    const token = data.data.token;
    console.log(data, "data");
    console.log(token, "token");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: token,
    });

    localStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};
