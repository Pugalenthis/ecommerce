import axios from "axios";
import { productsSuccess, productSuccess } from "../slices/productSlice";

export const getProducts = (formData) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/products/getallproducts",
      formData
    );

    dispatch(productsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = (product_id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/products/${product_id}`
    );

    console.log(response.data);
    dispatch(productSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};