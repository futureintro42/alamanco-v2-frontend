// third-party
import { createSlice } from "@reduxjs/toolkit";

import { header } from "../../utils/initialState";

/*
 * Header Reducer
 * A function that accepts an initial state, an object of reducer functions, and a "slice name",
 * and automatically generates action creators and action types that correspond to the reducers and state.
 */
const headerSlice = createSlice({
  name: "header",
  initialState: header,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
      return state;
    },
  },
});

export const { setOpen } = headerSlice.actions;
export default headerSlice.reducer;
