import React from "react";
import { Box, Typography } from "@mui/material";

import Loader from "../../atoms/Loader";

const ErrorPage = (props) => {
  const { type, message } = props;

  if (type === 404) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h1" style={{ color: "black" }}>
          [404] Page not found.
        </Typography>
        <a href="/">Go to home page.</a>
      </Box>
    );
  }
  if (type === 200) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Loader />
        <Typography>Query process...</Typography>
      </Box>
    );
  }
  if (type === 201) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h1" style={{ color: "black" }}>
          {message || "Authentication failed!"}
        </Typography>
        <a href="/">Go to home page.</a>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" style={{ color: "black" }}>
        [404] Page not found.
      </Typography>
      <a href="/">Go to home page.</a>
    </Box>
  );
};

ErrorPage.defaultProps = {
  type: 201,
  message: "",
};

export default ErrorPage;
