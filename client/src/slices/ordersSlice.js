import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  isLoading: true,
};

export const ordersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ordersLoadingSuccess: (state, action) => {
      return {
        orders: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { ordersLoadingSuccess } = ordersSlice.actions;
export default ordersSlice.reducer;
