import React from "react";
import { Box, Typography, Container } from "@mui/material";

const PageBanner = ({pageTitle}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
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
        <Typography variant="h2" fontWeight="bold" sx={{color: "#1f4074"}}>
          {pageTitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PageBanner;
