import React from "react";
import { Link } from "react-router-dom";
import { Box, Divider, Typography, Button } from "@mui/material";

const PageTitle = ({ title, url, buttonTitle, searchTitle, searchURL }) => {
  return (
    <Box sx={{ width: "100%", mb: 2, mt:2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h1" component="h1">
          {title}
        </Typography>
        <Box>
        {searchTitle && searchURL && (
          <Link to={searchURL}>
            <Button variant="contained" sx={{mr: '4px'}}>{searchTitle}</Button>
          </Link>
        )}
        {buttonTitle && (
          <Link to={url}>
            <Button variant="contained">{buttonTitle}</Button>
          </Link>
        )}
        </Box>
      </Box>

      <Divider
        variant="fullWidth"
        sx={{
          width: "100%",
          mt: 1,
          mb: 1,
          borderBottomWidth: 2,
          borderColor: (theme) => theme.palette.grey[400],
        }}
      />
    </Box>
  );
};

export default PageTitle;
