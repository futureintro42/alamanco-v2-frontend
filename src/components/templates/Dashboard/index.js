import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Grid container spacing={2} sx={{mb:10}}>
      <Grid item xs={12} sm={6}>
      <Card sx={{ maxWidth: '100%'}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="170"
            image={`${process.env.PUBLIC_URL}/assets/images/card.png`}
            alt="Card"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              SAFETY International Company For Inspection
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to="/cards">CARD</Link>
          </Button>
        </CardActions>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Card sx={{ maxWidth: '100%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="170"
            image={`${process.env.PUBLIC_URL}/assets/images/certificate.png`}
            alt="Card"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              SAFETY International Company For Inspection
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to="/certificate">Certificate</Link>
          </Button>
        </CardActions>
      </Card>
    
      </Grid>
      </Grid>
      
      </Box>
  );
};

export default Dashboard;
