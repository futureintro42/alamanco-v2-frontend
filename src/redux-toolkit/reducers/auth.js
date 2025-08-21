import { createSlice } from "@reduxjs/toolkit";

import { auth } from "../../utils/initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    setLoggedIn: (state, action) => {
      const {isLoggedIn, name, role, status } = action.payload;
      state = {isLoggedIn, name, role, status };
      return state;
    },
    logout: (state) => {
      state = { ...auth };
      return state;
    },
  },
});

export const { setLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
