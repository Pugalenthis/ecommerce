import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      console.log(state.filter((item) => item.id != action.payload.id));
      state = state.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
