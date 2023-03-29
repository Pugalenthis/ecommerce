import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import alertSlice from "../slices/alertSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
  },
});
