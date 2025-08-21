import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
  FormHelperText,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GET_TOKEN_TO_SET_PASSWORD } from "../../../constants/Query";
import { forgotPasswordSchema } from "../../../utils/schema";
import { isValidated } from "../../../utils/utils";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [captchaMsg, setCaptchaMsg] = React.useState(
    "Please click on I'm not a robot."
  );
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [getTokenToSetPassword, { loading, error, data }] = useLazyQuery(
    GET_TOKEN_TO_SET_PASSWORD
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const captchaOnChange = (value) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

  const onSubmitHandler = (input, e) => {
    e.preventDefault();
    setSubmitted(true);
    if (captcha) {
      getTokenToSetPassword({ variables: { input } });
    } else {
      setCaptchaMsg("Please click on I'm not a robot");
      setSubmitted(false);
    }
  };
  // Response: Form submit handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.getTokenToSetPassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        navigate(`/set-password/${response.token}`);
        navigate(0);
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
              Forgot Password
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
                <InputLabel htmlFor="email" aria-label="Email" required>
                  Email
                </InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  label="Username"
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
