import React from "react";
import { Box, Typography, Container } from "@mui/material";

const PageBanner = ({pageTitle}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: {xs: '300px', md: '400px'},
        //backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/banner.jpg)`,
        backgroundImage: "url(https://alamanextuv.com/uploads/images/9bd203ef69213cdacbd3a79b5b4b2d2f.jpg)",
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
        <Typography variant="h2" fontWeight="bold" sx={{color: "#1f4074", mt: {xs: '30%', md: '20%'}}}>
          {pageTitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PageBanner;
