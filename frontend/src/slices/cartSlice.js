import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItemsAmount: 0,
  totalShippingAmount: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      let isAlreadyExistingItem = current(state.cartItems).find(
        (item) => item._id == action.payload._id
      );
      console.log("isALreadyExistingItem", isAlreadyExistingItem);
      if (isAlreadyExistingItem) {
      }
      state.cartItems.push(action.payload);
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
