import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Grid,
  Box,
  FormHelperText,
  Alert,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { updateProfileSchema } from "../../../utils/schema";
import { isValidated } from "../../../utils/utils";
import { UPDATE_PROFILE } from "../../../constants/Mutation";
import { useSelector } from "react-redux";

const UpdateProfileForm = ({ _id, first_name, last_name, role }) => {
  const auth = useSelector((state) => state.auth);
  const isAdmin = !!(auth?.isLoggedIn && auth?.role === "admin");
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [defaultRole, setDefaultRole] = React.useState(
    role === "ADMIN" ? true : false
  );
  const [updateProfile, { loading, error, data }] = useMutation(UPDATE_PROFILE);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  React.useEffect(() => {
    const defaultRole = role === "ADMIN" ? true : false;
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("role", defaultRole);
    setDefaultRole(defaultRole);
  }, [first_name, last_name, role, setValue]);

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setSubmitted(true);
    const input = {
      _id,
      first_name: data.first_name,
      last_name: data.last_name,
      role: isAdmin ? (data.role ? "ADMIN" : "USER") : role,
    };
    updateProfile({
      variables: { input },
    });
  };
  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateProfile;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
    }
  }, [loading, error, data, setSeverity, setMessage, setError]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      sx={{ mt: 1 }}
      autoComplete="off"
    >
      <Grid container>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {severity && message && (
            <Grid item xs={12}>
              <Alert
                variant="standard"
                severity={severity}
                sx={{ width: "100%", mt: 1 }}
              >
                {message}
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            autoComplete="given-name"
            name="first_name"
            required
            fullWidth
            id="first_name"
            label="First Name"
            autoFocus
            error={!!errors?.first_name?.message}
            {...register("first_name")}
          />
          {errors?.first_name && (
            <FormHelperText error id="email-error">
              {errors?.first_name?.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
            error={!!errors?.last_name?.message}
            {...register("last_name")}
          />
          {errors?.last_name && (
            <FormHelperText error id="email-error">
              {errors?.last_name?.message}
            </FormHelperText>
          )}
        </Grid>
        {isAdmin && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox defaultChecked={defaultRole} {...register("role")} />
              }
              label="Set as Admin"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
            aria-label="signup button"
            disabled={isSubmitted}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
UpdateProfileForm.propTypes = {
  _id: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  role: PropTypes.string,
};

UpdateProfileForm.defaultProps = {
  _id: "",
  first_name: "",
  last_name: "",
  role: "",
};

export default UpdateProfileForm;
