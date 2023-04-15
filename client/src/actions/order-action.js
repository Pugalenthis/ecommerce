// import

import axios from "axios";
import { addItemToCart } from "../slices/cartSlice";
import { addOrder, updateOrder } from "../slices/orderSlice";

export const createOrderAction =
  (razorpayOrderData, customizedOrderData, initPayment) => async (dispatch) => {
    console.log("customizedOrderData", customizedOrderData);
    try {
      console.log(
        "axios.defaults.headers.common",
        axios.defaults.headers.common
      );
      const response = await axios.post(
        `http://localhost:4000/api/orders/${customizedOrderData.user}`,
        customizedOrderData
      );
      dispatch(addOrder(response.data));
      initPayment(razorpayOrderData);
    } catch (error) {
      console.log("error in createorder", error);
    }
  };

export const updatePaymentStatus =
  (updateOrderData, user_id, sendOrderId) => async (dispatch) => {
    console.log("updateOrderData", updateOrderData);
    try {
      console.log(
        "axios.defaults.headers.common",
        axios.defaults.headers.common
      );
      const response = await axios.put(
        `http://localhost:4000/api/orders/paid/${updateOrderData.razorpay_order_id}/${user_id}`,
        updateOrderData
      );
      console.log("after upating payment data in api", response.data);
      dispatch(updateOrder(response.data));
      sendOrderId(response.data._id);
    } catch (error) {
      console.log("error in createorder", error);
    }
  };

export const markAsDeliveredAction =
  (order_id, updateOrderData) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/orders/delivered/${order_id}`,
        updateOrderData
      );
      console.log("after upating payment data in api", response.data);
      dispatch(updateOrder(response.data));
    } catch (error) {
      console.log("error in createorder", error);
    }
  };

export const getOrderById = (orderId) => async () => {
  try {
    const response = await axios.get(
      `http://locahost:4000/api/orders/${orderId}`
    );
    console.log("response in getOrderById", response.data);
  } catch (error) {
    console.log(error);
  }
};
