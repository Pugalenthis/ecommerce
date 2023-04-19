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
    addProduct: (state, action) => {
      if (state.products) {
        state.products.push(action.payload);
      } else {
        return {
          products: [...action.payload],
          isLoading: false,
        };
      }
    },
    // updateProduct: (state, action) => {
    //   return {
    //     products:state.products.map(())
    //   }
    // },
    deleteProduct: (state, action) => {
      return {
        products: state.products.filter(
          (product) => action.payload != product._id
        ),
        isLoading: false,
      };
    },
  },
});

export const {
  productsLoadingSuccess,
  addProduct,
  deleteProduct,
  updateProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
