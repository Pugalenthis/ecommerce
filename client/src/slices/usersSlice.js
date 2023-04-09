import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  isLoading: true,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersLoadingSuccess: (state, action) => {
      return {
        users: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { usersLoadingSuccess } = usersSlice.actions;
export default usersSlice.reducer;
