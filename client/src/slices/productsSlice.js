import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  isLoading: true,
};

export const productsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    productsLoadingSuccess: (state, action) => {
      return {
        products: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { productsLoadingSuccess } = productsSlice.actions;
export default productsSlice.reducer;
