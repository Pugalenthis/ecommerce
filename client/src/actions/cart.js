// import

import axios from "axios";
import { addItemToCart } from "../slices/cartSlice";

export const createOrderInRazorpayAction = (makePayment) => async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/payments/order"
    );
    console.log("response", response);
    makePayment(response.data);
  } catch (error) {
    console.log("error in createorderaction", error);
  }
};

export const createOrderAction =
  (razorpayOrderData, customizedOrderData, initPayment) => async () => {
    console.log("customizedOrderData", customizedOrderData);
    try {
      console.log(
        "axios.defaults.headers.common",
        axios.defaults.headers.common
      );
      const response = await axios.post(
        "http://localhost:4000/api/orders/",
        customizedOrderData
      );
      console.log("order in createOrderAction", response.data);
      initPayment(razorpayOrderData);
    } catch (error) {
      console.log("error in createorder", error);
    }
  };
