import React from "react";
import { Box, Typography, Container } from "@mui/material";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        //backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/banner.jpg)`,
        backgroundImage: "url(https://alamanextuv.com/img/b3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight="bold">
          Welcome to My Website
        </Typography>
        <Typography variant="h6" mt={2}>
          Your awesome tagline goes here!
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroBanner;
