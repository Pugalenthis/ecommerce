import { loginSuccess } from "../slices/authSlice";
import axios from "axios";
import { setAlertAction } from "./alert";

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/login",
      formData
    );
    console.log("respnose.data", response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(setAlertAction(error.response.data.message.errors));
  }
};
