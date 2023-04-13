import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  myOrders: [],
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.myOrders.push(action.payload);
    },
    updateOrder: (state, action) => {
      let ordersBeforePayment = current(state.myOrders);
      return {
        isLoading: false,
        myOrders: ordersBeforePayment.map((order) => {
          return order.razporpayOrderId === action.payload.razporpayOrderId
            ? action.payload
            : order;
        }),
      };
    },
    myOrdersLoadingSuccess: (state, action) => {
      return { ...state, isLoading: false, myOrders: action.payload };
    },
  },
});

export const { addOrder, updateOrder, myOrdersLoadingSuccess } =
  orderSlice.actions;
export default orderSlice.reducer;
