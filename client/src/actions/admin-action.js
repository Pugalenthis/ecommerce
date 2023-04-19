import api from "../utils/api";
import {
  deleteProduct,
  productsLoadingSuccess,
  addProduct,
  updateProduct,
} from "../slices/adminSlice";
import { setAlertAction } from "./alert";

export const getProducts = () => async (dispatch) => {
  try {
    const response = await api.get(
      "http://localhost:4000/api/products/admin/getallproducts"
    );
    console.log("response in data allproducts action", response.data);
    dispatch(productsLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
    dispatch(setAlertAction("Something went wrong", "red"));
  }
};

export const addProductAction = (formData) => async (dispatch) => {
  console.log("entered into addProduct");
  try {
    const response = await api.post(
      `http://localhost:4000/api/products/`,
      formData
    );

    dispatch(setAlertAction("product created Successfully", "green"));
    dispatch(addProduct(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductAction = (productData) => async (dispatch) => {
  console.log("entered into addProduct");
  try {
    const response = await api.put(
      `http://localhost:4000/api/products/${productData._id}`,
      productData
    );
    console.log("response.data in updateproductaction", response.data);

    // dispatch(updateProduct(response.data));
    dispatch(setAlertAction("product edited successfully", "green"));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductAction = (productId) => async (dispatch) => {
  console.log("entered into deleteProduct");
  try {
    const response = await api.delete(
      `http://localhost:4000/api/products/${productId}`
    );

    dispatch(deleteProduct(productId));
    dispatch(setAlertAction("product deleted successfully", "green"));

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserAction = (userData) => async (dispatch) => {
  console.log("userdata in updateUserAction", userData);
  console.log("entered into deleteProduct");
  try {
    const response = await api.put(
      `http://localhost:4000/api/users/${userData._id}`,
      userData
    );

    console.log("response.data", response.data);
    // dispatch(deleteProduct(productId));
    dispatch(setAlertAction("User updated successfully", "green"));

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
