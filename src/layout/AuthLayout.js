import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthHeader from "../components/molecules/Header/AuthHeader";
import AuthFooter from "../components/molecules/Footer/AuthFooter";
import Loader from "../components/atoms/Loader";
import ErrorPage from "../components/molecules/Error/ErrorPage";
import useAuthentication from "../hooks/useAuthentication";
import { setLoggedIn } from "../redux-toolkit/reducers/auth";

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, error, queryStatus, response, message] = useAuthentication();

  useEffect(() => {
    if (queryStatus && response) {
      dispatch(setLoggedIn(response));
      navigate("/dashboard");
      navigate(0);
    }
  }, [dispatch, queryStatus, navigate, response]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && error) {
    return <ErrorPage type={201} message={message} />;
  }

  return (
    <>
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
