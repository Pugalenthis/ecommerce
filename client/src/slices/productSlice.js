import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: true,
  product: null,
  page: null,
  pages: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsSuccess: (state, action) => {
      let updatedState = {
        products: action.payload.products,
        isLoading: false,
        product: null,
        pages: action.payload.pages,
        page: action.payload.page,
      };
      return updatedState;
    },
    productSuccess: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
  },
});

export const { productsSuccess, productSuccess } = productSlice.actions;
export default productSlice.reducer;
