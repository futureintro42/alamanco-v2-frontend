import React from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Alert,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { signupSchema } from "../../../utils/schema";
import { isValidated } from "../../../utils/utils";
import { SIGNUP } from "../../../constants/Mutation";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [captcha, setCaptcha] = React.useState("");
  const [captchaMsg, setCaptchaMsg] = React.useState(
    "Please click on I'm not a robot."
  );
  const [signup, { loading, error, data }] = useMutation(SIGNUP);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const captchaOnChange = (value) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setSubmitted(true);
    if (captcha) {
      signup({
        variables: { input: { ...data, role: "USER" } }, // TODO role: hard code
      });
    } else {
      setCaptchaMsg("Please click on I'm not a robot");
      setSubmitted(false);
    }
  };
  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.signup;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        resetField("first_name");
        resetField("last_name");
        resetField("email");
        resetField("password");
        resetField("confirmPassword");
        navigate("/");
      }
    }
  }, [
    loading,
    error,
    data,
    setSeverity,
    setMessage,
    navigate,
    setError,
    resetField,
  ]);
  return (
    <Container maxWidth={false} sx={{ maxWidth: "600px" }}>
      <Card sx={{ mt: 10, border: 1, borderColor: "primary.dark" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h2">
              Sign Up
            </Typography>
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
                <Grid item xs={12}></Grid>
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
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    autoComplete="off"
                    margin="normal"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel htmlFor="email" aria-label="email" required>
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="off"
                      aria-label="email"
                      sx={{ width: "100%" }}
                      aria-describedby="email-error"
                      error={!!errors?.email?.message}
                      {...register("email")}
                    />
                    {errors?.email && (
                      <FormHelperText error id="email-error">
                        {errors?.email?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    autoComplete="off"
                    margin="normal"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel
                      htmlFor="password"
                      aria-label="password"
                      required
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      autoComplete="off"
                      aria-describedby="password-error"
                      error={!!errors?.password?.message}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors?.password && (
                      <FormHelperText error id="password-error">
                        {errors?.password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    autoComplete="off"
                    margin="normal"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel
                      htmlFor="confirmPassword"
                      aria-label="Confirm Password"
                      required
                    >
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      autoComplete="off"
                      aria-describedby="password-error"
                      error={!!errors?.confirmPassword?.message}
                      {...register("confirmPassword", {
                        required: "Password is required",
                      })}
                    />
                    {errors?.confirmPassword && (
                      <FormHelperText error id="password-error">
                        {errors?.confirmPassword?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                    onChange={(currentValue) => captchaOnChange(currentValue)}
                    onExpired={() => captchaOnExpired()}
                    onErrored={() => captchaOnExpired()}
                  />
                  {captchaMsg && (
                    <Alert
                      variant="standard"
                      severity="error"
                      sx={{ width: "100%", mt: 1 }}
                    >
                      {captchaMsg}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "100%" }}
                    aria-label="signup button"
                    disabled={isSubmitted}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body1" aria-label="login">
                    Already have a account
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};

SignUpForm.defaultProps = {
  onSubmit: () => {
    /* default onSubmit handler */
  },
};

export default SignUpForm;
