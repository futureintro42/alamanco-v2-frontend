import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import SetPasswordForm from "../../molecules/SetPasswordForm";

// ================================|| LOGIN ||================================ //

const SetPassword = () => {
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
        <SetPasswordForm />
      </Grid>
    </Grid>
  );
};

export default SetPassword;
