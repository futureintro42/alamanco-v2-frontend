import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const AuthHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            sx={{height: '80px', width: '80px'}}
            alt=""
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AuthHeader;
