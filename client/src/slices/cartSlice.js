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
        let oldCartItems = current(state.cartItems);
        let updatedCartItems = oldCartItems.map((cartItem) =>
          cartItem._id === isAlreadyExistingItem._id ? action.payload : cartItem
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === isAlreadyExistingItem._id
              ? isAlreadyExistingItem
              : cartItem
          ),
        };
      } else {
        let cartItemsInLocalStorage = localStorage.getItem("cart");
        if (!cartItemsInLocalStorage) {
          cartItemsInLocalStorage = [];
        }
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartItemsInLocalStorage, action.payload])
        );
        state.cartItems.push(action.payload);
      }
    },
    removeItemFromCart: (state, action) => {
      let updatedCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem("cart", updatedCartItems);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    },
    updateShippingAddress: (state, action) => {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    addItemsFromLocalStorage: (state, action) => {
      let cartItemsInLocalStorage = localStorage.getItem("cart");
      let shippingAddressInLocalStorage =
        localStorage.getItem("shippingAddress");

      if (!cartItemsInLocalStorage) {
        cartItemsInLocalStorage = [];
      }
      if (!shippingAddressInLocalStorage) {
        shippingAddressInLocalStorage = {};
      }
      cartItemsInLocalStorage =
        cartItemsInLocalStorage.length === 0
          ? cartItemsInLocalStorage
          : JSON.parse(cartItemsInLocalStorage);
      shippingAddressInLocalStorage =
        Object.keys(shippingAddressInLocalStorage).length === 0
          ? shippingAddressInLocalStorage
          : JSON.parse(shippingAddressInLocalStorage);

      return {
        ...state,
        cartItems: cartItemsInLocalStorage,
        shippingAddress: shippingAddressInLocalStorage,
      };
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateShippingAddress,
  addItemsFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
