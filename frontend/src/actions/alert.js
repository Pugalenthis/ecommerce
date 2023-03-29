import { v4 as uuidv4 } from "uuid";
import { setAlert, removeAlert } from "../slices/alertSlice";

export const setAlertAction =
  (message, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch(setAlert({ id, message, alertType }));
    setTimeout(() => dispatch(removeAlert({ id })), timeout);
  };
