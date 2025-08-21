import { createSlice } from "@reduxjs/toolkit";

import { modalInitialState } from "../../utils/initialState";

export const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    onOpen: (state, action) => {
      state = action.payload;
      return state;
    },
    onClose: (state) => {
      state = modalInitialState;
      return state;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;
export default modalSlice.reducer;
