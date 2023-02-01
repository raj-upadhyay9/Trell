import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { userLoginReducer } from "./reducers/userReducer";

import { showListReducer } from "./reducers/showReducers";

const reducer = combineReducers({
  showList: showListReducer,
  userLogin: userLoginReducer,
});

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  userLogin: { token: token },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware: middleware,
});

export default store;
