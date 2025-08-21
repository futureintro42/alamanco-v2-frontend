import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Toolbar } from "@mui/material";

import Loader from "../components/atoms/Loader";
import ErrorPage from "../components/molecules/Error/ErrorPage";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/Footer";
import useAuthentication from "../hooks/useAuthentication";
import { setLoggedIn } from "../redux-toolkit/reducers/auth";

const MainLayout = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, error, queryStatus, response, message] = useAuthentication();

  React.useEffect(() => {
    if (queryStatus && !response) {
      navigate("/login");
      navigate(0);
    } else if (queryStatus && response) {
      dispatch(setLoggedIn(response));
    }
  }, [dispatch, queryStatus, navigate, response]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && error) {
    return <ErrorPage type={201} message={message} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
