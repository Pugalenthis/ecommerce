import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import alertSlice from "../slices/alertSlice.js";
import productSlice from "../slices/productSlice.js";
import cartSlice from "../slices/cartSlice.js";
import orderSlice from "../slices/orderSlice.js";
import usersSlice from "../slices/usersSlice.js";
import productsSlice from "../slices/productsSlice.js";
import ordersSlice from "../slices/ordersSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    users: usersSlice,
    products: productsSlice,
    orders: ordersSlice,
  },
});
