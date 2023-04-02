import { loginSuccess, logOut } from "../slices/authSlice";
import axios from "axios";
import { setAlertAction } from "./alert";

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/login",
      formData
    );

    dispatch(loginSuccess(response.data));
    dispatch(setAlertAction("Login successfully", "green"));
  } catch (error) {
    const errors = error.response.data.message.errors;
    errors.map((error) => {
      dispatch(setAlertAction(error.message, "red"));
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/register",
      formData
    );

    dispatch(loginSuccess(response.data));
    dispatch(setAlertAction("Login successfully", "green"));
  } catch (error) {
    const errors = error.response.data.message.errors;
    errors.map((error) => {
      dispatch(setAlertAction(error.message, "red"));
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/api/users/user");

    dispatch(
      loginSuccess({ token: localStorage.getItem("token"), ...response.data })
    );
  } catch (error) {
    dispatch(logOut());
  }
};
