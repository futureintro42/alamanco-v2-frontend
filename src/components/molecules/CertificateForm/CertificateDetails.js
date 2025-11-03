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

const CertificateDetails = ({ dataRow }) => {
  const {
    id,
    business_address,
    business_name,
    equipment_description,
    equipment_type,
    inspection_date,
    inspection_next_date,
    inspector_name,
    reference_number,
    sticker_number,
    make,
    serial_number,
  } = dataRow || {};

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
                <Link href="https://alamancom.com/">alamancom.com</Link>
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
                SAFETY Certificate information
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
                Certificate No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Sticker No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{sticker_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Reference No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{reference_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Date of inspection
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{inspection_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Date of next inspection
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{inspection_next_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Equipment tyip
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{equipment_type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Equipment description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{equipment_description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Make
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{make}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Serial No.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{serial_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Business name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{business_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Business address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{business_address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Inspector's name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{inspector_name}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

CertificateDetails.defaultProps = {
  title: "",
  dataRow: {},
};

export default CertificateDetails;
