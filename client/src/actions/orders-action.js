import axios from "axios";
import { myOrdersLoadingSuccess } from "../slices/orderSlice";
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

export const getMyOrders = (user_id) => async (dispatch) => {
  console.log("entered into getMyOrders");
  console.log("auth");
  try {
    const response = await axios.get(
      `http://localhost:4000/api/orders/user/${user_id}`
    );
    console.log("response in getMyOrders", response.data);
    dispatch(myOrdersLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
  }
};
