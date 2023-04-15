import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import alertSlice from "../slices/alertSlice.js";
import productSlice from "../slices/productSlice.js";
import cartSlice from "../slices/cartSlice.js";
import orderSlice from "../slices/orderSlice.js";
import usersSlice from "../slices/usersSlice.js";
import adminSlice from "../slices/adminSlice.js";
import ordersSlice from "../slices/ordersSlice.js";
import { setAuthToken } from "../utils/setAuthToken.js";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    users: usersSlice,
    admin: adminSlice,
    orders: ordersSlice,
  },
});

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();

  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    console.log("previousState.auth.token", previousState.auth.token);
    console.log("currentState", currentState);
    console.log("currentstate.auth.token", currentState.auth.token);
    localStorage.setItem("token", currentState.auth.token);
    setAuthToken(currentState.auth.token);
  }
});
