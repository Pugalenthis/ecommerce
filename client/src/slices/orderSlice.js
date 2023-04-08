import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = [];
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    updateOrder: (state, action) => {
      console.log("updateOrder data in slice", action.payload);
      let ordersBeforePayment = current(state);
      return ordersBeforePayment.map((order) => {
        return order.razporpayOrderId === action.payload.razporpayOrderId
          ? action.payload
          : order;
      });
    },
  },
});

export const { addOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
