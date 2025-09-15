import React from "react";
import { Box, Typography, AppBar, Toolbar, Grid } from "@mui/material";

const AuthHeader = () => {
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="static" sx={{backgroundColor: "#fff"}}>
        <Toolbar>
          <Grid container sx={{display: "flex", justifyContent: {xs: 'space-between', md: 'center'}}}>
            <Grid item size={{ xs: 6, md: 4 }}>
              <Box
                component="img"
                sx={{ height: '80px', width: '80px', mr: 1.5 }}
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              />
            </Grid>
            <Grid item size={{ xs: 4, md: 4 }} sx={{display: {xs: 'none', md: 'flex'}}}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    // fontFamily: 'monospace',
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    letterSpacing: ".3rem",
                    color: "#1f4074",
                    textDecoration: "none",
                  }}
                >
                  SAFETY International Company For Inspection
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{ xs: 6, md: 4 }}>
              <Box
                component="img"
                sx={{ height: '80px', width: '80px' }}
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/images/safetyLogo.png`}
              />
            </Grid>
            <Grid item size={{ xs: 12}} sx={{width: '100%', p: 0, display: {xs: 'flex', md: 'none'}}}>
              <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    flexGrow: 1,
                    fontWeight: "700",
                    fontSize: { xs: ".70rem"},
                    letterSpacing: ".1rem",
                    color: "#1f4074",
                    textDecoration: "none",
                    margin: '0',
                    padding: '0'
                  }}
                >
                  SAFETY International Company For Inspection
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AuthHeader;
