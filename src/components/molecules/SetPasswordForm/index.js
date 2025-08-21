import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { SET_PASSWORD } from "../../../constants/Mutation";
import { setPasswordSchema } from "../../../utils/schema";
import { isValidated } from "../../../utils/utils";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { token = "" } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [captcha, setCaptcha] = React.useState("");
  const [captchaMsg, setCaptchaMsg] = React.useState(
    "Please click on I'm not a robot."
  );
  const [setPassword, { loading, error, data }] = useMutation(SET_PASSWORD);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(setPasswordSchema) });

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

  const onSubmitHandler = (input, e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!token) {
      setSeverity("error");
      setMessage("Token is invalid!");
    } else {
      if (captcha) {
        setPassword({ variables: { input: { ...input, token } } });
      } else {
        setCaptchaMsg("Please click on I'm not a robot");
      }
    }
    setSubmitted(false);
  };
  // Response: Form submit handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.setPassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        navigate("/login");
      }
    }
  }, [loading, error, data, setError, navigate, setSubmitted]);

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
              Set Password
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
                Submit
              </Button>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Link
                    href="/sign-up"
                    variant="body1"
                    aria-label="signup link"
                  >
                    Create Account?
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Link href="/login" variant="body1" aria-label="Login link">
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

export default ForgotPasswordForm;
