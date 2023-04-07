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
