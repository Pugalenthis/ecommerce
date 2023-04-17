import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  isLoading: true,
};

export const productsSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    productsLoadingSuccess: (state, action) => {
      return {
        products: action.payload,
        isLoading: false,
      };
    },
    updateProducts: (state, action) => {
      if (state.products) {
        state.products.push(action.payload);
      } else {
        return {
          products: [...action.payload],
          isLoading: false,
        };
      }
    },
  },
});

export const { productsLoadingSuccess, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
