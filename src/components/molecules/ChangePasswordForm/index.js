import React from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { CHANGE_PASSWORD } from "../../../constants/Mutation";
import { changePasswordSchema } from "../../../utils/schema";
import { isValidated } from "../../../utils/utils";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [captcha, setCaptcha] = React.useState("");
  const [captchaMsg, setCaptchaMsg] = React.useState(
    "Please click on I'm not a robot."
  );
  const [changePassword, { loading, error, data }] =
    useMutation(CHANGE_PASSWORD);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(changePasswordSchema) });

  const captchaOnChange = (value) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler = (input, e) => {
    e.preventDefault();
    setSubmitted(true);
    if (captcha) {
      changePassword({ variables: { input } });
    } else {
      setCaptchaMsg("Please click on I'm not a robot");
      setSubmitted(false);
    }
  };
  // Response: Form submit handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.changePassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        resetField("oldPassword");
        resetField("password");
        resetField("confirmPassword");
      }
      setSubmitted(false);
    }
  }, [loading, error, data, setError, navigate, setSubmitted, resetField]);

  return (
    <Container sx={{ maxWidth: { xs: "100%", sm: "600px" } }}>
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
            <Typography component="h2" variant="h2">
              Change Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 1 }}
              autoComplete="off"
            >
              {severity && message && (
                <Alert
                  variant="standard"
                  severity={severity}
                  sx={{ width: "100%", mt: 1 }}
                >
                  {message}
                </Alert>
              )}
              <FormControl
                variant="outlined"
                autoComplete="off"
                margin="normal"
                sx={{ width: "100%" }}
              >
                <InputLabel
                  htmlFor="oldPassword"
                  aria-label="oldPassword"
                  required
                >
                  Old Password
                </InputLabel>
                <OutlinedInput
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Old Password"
                  autoComplete="off"
                  aria-describedby="password-error"
                  error={!!errors?.password?.message}
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
                {errors?.oldPassword && (
                  <FormHelperText error id="password-error">
                    {errors?.oldPassword?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                variant="outlined"
                autoComplete="off"
                margin="normal"
                sx={{ width: "100%" }}
              >
                <InputLabel htmlFor="password" aria-label="password" required>
                  New Password
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
                  label="New Password"
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
                  Confirm New Password
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
                  label="Confirm New Password"
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
              <FormControl
                variant="outlined"
                autoComplete="off"
                margin="normal"
                sx={{ width: "100%" }}
              >
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
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100%" }}
                aria-label="forgot password button"
                disabled={isSubmitted}
              >
                Change
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChangePasswordForm;
