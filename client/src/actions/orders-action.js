import axios from "axios";
import { ordersLoadingSuccess } from "../slices/ordersSlice";

export const getOrders = () => async (dispatch) => {
  console.log("entered into get Orders");
  try {
    const response = await axios.get(`http://localhost:4000/api/orders/`);
    console.log("response in data getOrders action", response.data);
    dispatch(ordersLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
  }
};
