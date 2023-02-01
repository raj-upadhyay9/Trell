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
  SHOW_CREATE_RESET,
  SHOW_UPDATE_REQUEST,
  SHOW_UPDATE_SUCCESS,
  SHOW_UPDATE_FAIL,
  SHOW_UPDATE_RESET,
  SHOW_CREATE_REVIEW_REQUEST,
  SHOW_CREATE_REVIEW_SUCCESS,
  SHOW_CREATE_REVIEW_FAIL,
  SHOW_CREATE_REVIEW_RESET,
  SHOW_TOP_REQUEST,
  SHOW_TOP_SUCCESS,
  SHOW_TOP_FAIL,
} from "../constants/showConstants";

export const showListReducer = (state = { shows: [] }, action) => {
  switch (action.type) {
    case SHOW_LIST_REQUEST:
      return { loading: true, shows: [] };

    case SHOW_LIST_SUCCESS:
      return {
        loading: false,
        shows: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case SHOW_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
