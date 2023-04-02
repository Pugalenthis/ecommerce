import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      let isAlreadyExistingItem = current(state.cartItems).find(
        (item) => item._id == action.payload._id
      );
      if (isAlreadyExistingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === isAlreadyExistingItem._id
              ? isAlreadyExistingItem
              : cartItem
          ),
        };
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeItemFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
