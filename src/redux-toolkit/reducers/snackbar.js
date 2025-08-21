import { createSlice } from "@reduxjs/toolkit";

import { snackbarInitialState } from "../../utils/initialState";

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: snackbarInitialState,
  reducers: {
    openSnackbar: (state, action) => {
      const {
        open,
        message,
        anchorOrigin,
        variant,
        alert,
        transition,
        close,
        actionButton,
      } = action.payload;

      state.action = !state.action;
      state.open = open || snackbarInitialState.open;
      state.message = message || snackbarInitialState.message;
      state.anchorOrigin =
        anchorOrigin || snackbarInitialState.anchorOrigin;
      state.variant = variant || snackbarInitialState.variant;
      state.alert = {
        color: alert?.color || snackbarInitialState.alert.color,
        variant: alert?.variant || snackbarInitialState.alert.variant,
      };
      state.transition = transition || snackbarInitialState.transition;
      state.close =
        close === false ? close : snackbarInitialState.close;
      state.actionButton =
        actionButton || snackbarInitialState.actionButton;
      return state;
    },

    closeSnackbar: (state) => {
      state.open = false;
      return state;
    },
  },
});

export const { closeSnackbar, openSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
