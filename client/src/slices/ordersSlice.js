import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: null,
  isLoading: true,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersLoadingSuccess: (state, action) => {
      return {
        allOrders: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { ordersLoadingSuccess } = ordersSlice.actions;
export default ordersSlice.reducer;
