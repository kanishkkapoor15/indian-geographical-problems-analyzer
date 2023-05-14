import { configureStore } from "@reduxjs/toolkit";
import propReducer from "./slice.js";

export default configureStore({
  reducer: {
    propertyStore: propReducer
  }
});
