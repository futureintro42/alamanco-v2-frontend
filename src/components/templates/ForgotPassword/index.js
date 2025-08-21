import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import ForgotPasswordForm from "../../molecules/ForgotPasswordForm";

// ================================|| LOGIN ||================================ //

const ForgotPassword = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const { isLoggedIn } = state;
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ForgotPasswordForm />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
