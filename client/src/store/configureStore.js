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
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    console.log(
      "token changed",
      previousState.auth.token,
      currentState.auth.token
    );
    setAuthToken(currentState.auth.token);
  }
});
