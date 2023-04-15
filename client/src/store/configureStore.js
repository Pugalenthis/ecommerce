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

let {
  auth: currentAuthState,
  alert: currentAlertState,
  product: currentProductState,
  cart: currentCartState,
  order: currentOrderState,
  users: currentUsersState,
  admin: currentAdminState,
  orders: currentOrdersState,
} = store.getState();

let previousAuthState = currentAuthState;
let previousCartState = currentCartState;
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let {
    auth: currentAuthState,
    alert: currentAlertState,
    product: currentProductState,
    cart: currentCartState,
    order: currentOrderState,
    users: currentUsersState,
    admin: currentAdminState,
    orders: currentOrdersState,
  } = store.getState();

  // if the token changes set the value in localStorage and axios headers
  if (previousAuthState.token !== currentAuthState.token) {
    localStorage.setItem("token", currentAuthState.token);
    setAuthToken(currentAuthState.token);
  }

  if (previousCartState.cartItems != currentCartState.cartItems) {
    console.log("previousCartState.cartItems", previousCartState.cartItems);
    console.log("currentCartState.cartItems", currentCartState);
    localStorage.setItem("cart", JSON.stringify(currentCartState.cartItems));
  }
  if (previousCartState.shippingAddress != currentCartState.shippingAddress) {
    console.log(
      "previousCartState.shippingAddress",
      previousCartState.shippingAddress
    );
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(currentCartState.shippingAddress)
    );
  }
});
