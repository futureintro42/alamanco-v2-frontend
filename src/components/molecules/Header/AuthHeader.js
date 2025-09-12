import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";

const AuthHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            sx={{ height: '80px', width: '80px', mr:1.5 }}
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                // fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SAFETY International Company For Inspection
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AuthHeader;
