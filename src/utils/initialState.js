export const auth = {
  isLoggedIn: false,
  name: "",
  role: "",
  status: "",
};
export const header = {
  open: false,
};
export const snackbarInitialState = {
  action: false,
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alert: {
    color: "primary",
    variant: "filled",
  },
  transition: "Fade",
  close: true,
  actionButton: false,
};

export const themeInitialState = {
    defaultPath: '/main-page',
    fontFamily: `'Public Sans', sans-serif`,
    miniDrawer: false,
    container: true,
    mode: 'light', //'dark',
    presetColor: 'theme1',
    themeDirection: 'ltr'
};
export const modalInitialState = {
  isOpen: false,
  title: '',
  hasClosedIcon: true,
  bodyContent: '',
  handleClose: () => {},
  modalActions: ''
}
