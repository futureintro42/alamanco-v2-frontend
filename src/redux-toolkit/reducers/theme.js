// third-party
import { createSlice } from "@reduxjs/toolkit";

import { themeInitialState } from "../../utils/initialState";

// initial state
/*
 * Header Reducer
 * A function that accepts an initial state, an object of reducer functions, and a "slice name",
 * and automatically generates action creators and action types that correspond to the reducers and state.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload.mode;
      state.themeDirection = action.payload.themeDirection;
      state.presetColor = action.payload.presetColor;
      return state;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
