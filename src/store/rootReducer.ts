import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "../redux/app.slice";

const appReducer = combineReducers({
  app: appSlice,
});

export default appReducer;
