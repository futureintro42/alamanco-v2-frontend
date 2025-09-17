import React from "react";
import { Box } from "@mui/material";
import WebNavigation from "../../molecules/WebNavigation";
import WebFooter from "../../molecules/Footer/WebFooter";
import HeroBanner from "../../molecules/Banner/HeroBanner";
import PageBanner from "../../molecules/Banner/PageBanner";

const WebLayout = ({ pageTitle, isHome = false, children }) => { 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // minHeight: "100vh",
      }}
    >
      {/* Navbar always on top */}
      <WebNavigation />

      {/* If homepage → HeroBanner with transparent nav */}
      {isHome ? <HeroBanner /> : <PageBanner pageTitle={pageTitle} /> }

      {/* Page content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: 2,
          py: 4,
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <WebFooter />
    </Box>
  );
};

export default WebLayout;
