import axios from "axios";
import { productsLoadingSuccess, updateProducts } from "../slices/adminSlice";

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/products/admin/getallproducts"
    );
    console.log("response in data allproducts action", response.data);
    dispatch(productsLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
  }
};

export const addProduct = (formData) => async (dispatch) => {
  console.log("entered into addProduct");
  try {
    const response = await axios.post(
      `http://localhost:4000/api/products/`,
      formData
    );

    dispatch(updateProducts(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
