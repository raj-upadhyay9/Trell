import axios from "axios";
import {
  SHOW_LIST_REQUEST,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_FAIL,
  SHOW_DETAILS_REQUEST,
  SHOW_DETAILS_SUCCESS,
  SHOW_DETAILS_FAIL,
  SHOW_DELETE_REQUEST,
  SHOW_DELETE_SUCCESS,
  SHOW_DELETE_FAIL,
  SHOW_CREATE_REQUEST,
  SHOW_CREATE_SUCCESS,
  SHOW_CREATE_FAIL,
  SHOW_UPDATE_REQUEST,
  SHOW_UPDATE_SUCCESS,
  SHOW_UPDATE_FAIL,
  SHOW_CREATE_REVIEW_REQUEST,
  SHOW_CREATE_REVIEW_SUCCESS,
  SHOW_CREATE_REVIEW_FAIL,
  SHOW_TOP_REQUEST,
  SHOW_TOP_SUCCESS,
  SHOW_TOP_FAIL,
} from "../constants/showConstants";

export const listShows = () => async (dispatch) => {
  try {
    dispatch({ type: SHOW_LIST_REQUEST });
    console.log("token from local", localStorage.getItem("token"));
    var { data } = await axios.get("/data", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log(data, "checkdata");

    dispatch({
      type: SHOW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
