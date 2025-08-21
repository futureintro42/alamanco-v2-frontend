import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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
import { LOGIN } from "../../../constants/Query";
import { loginSchema } from "../../../utils/schema";
import { isValidated, setCookie } from "../../../utils/utils";

const LoginForms = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [login, { loading, error, data }] = useLazyQuery(LOGIN);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmitHandler = (input, e) => {
    e.preventDefault();
    setSubmitted(true);
    login({ variables: { input } });
  };
  // Response: Form submit handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.login;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        setCookie(process.env.REACT_APP_TOKEN_KEY, response.token);
        navigate("/dashboard");
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
              Login
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
                <InputLabel htmlFor="password" aria-label="password" required>
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
                  {...register("password")}
                />
                {errors?.password && (
                  <FormHelperText error id="password-error">
                    {errors?.password?.message}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100%" }}
                aria-label="login button"
                disabled={isSubmitted}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Link
                    href="/forgot-password"
                    variant="body1"
                    aria-label="forgot password link"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Link
                    href="/sign-up"
                    variant="body1"
                    aria-label="forgot password link"
                  >
                    Create Account
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
LoginForms.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForms.defaultProps = {
  onSubmit: () => {
    /* default onSubmit handler */
  },
};

export default LoginForms;
