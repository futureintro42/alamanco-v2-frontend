import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  CardMedia,
  Divider,
  Link,
} from "@mui/material";

const CardView = ({ dataRow }) => {
  const { id, name, iqama_number, issue_date, expiry_date, certified_as } =
    dataRow || {};
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mt: { sm: 5, xs: 0 },
        padding: { xs: 0 }
      }}
    >
      <Card sx={{ width: { xs: "100%", sm: "60%" } }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                alt="logo"
                image={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                sx={{
                  objectFit: "fill",
                  width: "100px",
                  height: "100px",
                  alignItems: "center",
                }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{ textAlign: "center", color: "#0f4c8d" }}
              >
                SAFETY International Company For Inspection
              </Typography>
              <Typography variant="h5" component="h5">
                <Link href="https://alamanextuv.com/">alamanextuv.com</Link>
              </Typography>
              <Divider
                sx={{
                  mb: 0.5,
                  mt: 0.5,
                  borderWidth: 2,
                  borderColor: "#22568a",
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h3"
                sx={{ textAlign: "center", color: "#0f4c8d" }}
              >
                SAFETY ID Card information
              </Typography>
              <Divider
                sx={{
                  mb: 0.5,
                  mt: 0.5,
                  borderWidth: 2,
                  borderColor: "#22568a",
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Job No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Card holder name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Iqama No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{iqama_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Issue date
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{issue_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Expiry Date
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{expiry_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Certified As
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{certified_as}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

CardView.defaultProps = {
  title: "",
  dataRow: {},
};

export default CardView;
