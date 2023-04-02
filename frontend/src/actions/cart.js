// import

import { addItemToCart } from "../slices/cartSlice";

export const addItemToCartAction = (item) => async (dispatch, getState) => {
  try {
    dispatch(addItemToCart(item));

    console.log("getState in addItemToCartAction", getState().cart.cartItems);
  } catch (error) {}
};
