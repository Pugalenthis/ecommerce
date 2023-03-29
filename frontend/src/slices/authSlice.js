import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      const { token, ...others } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = others;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
