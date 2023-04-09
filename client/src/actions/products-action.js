import axios from "axios";
import { productsLoadingSuccess } from "../slices/productsSlice";

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/products/getallproducts"
    );
    console.log("response in data getUsers action", response.data);
    dispatch(productsLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
  }
};
