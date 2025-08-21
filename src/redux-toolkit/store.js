import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import header from "./reducers/header";
import snackbar from "./reducers/snackbar";
import theme from "./reducers/theme";
import modal from "./reducers/modal";

const store = configureStore({
  reducer: {
    auth,
    header,
    snackbar,
    theme,
    modal,
  },
  middleware: (getdefaultmiddleware) =>
    getdefaultmiddleware({
      serializablecheck: false,
    }),
});

export default store;
