import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  CardMedia,
  Button,
  Link,
} from "@mui/material";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../utils/utils";

const CardView = ({ dataRow }) => {
  const ref = useRef();
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: { xs: 0 },
      }}
    >
      <Card sx={{ mb: 4, width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <RouterLink to="/cards/search" style={{ textDecoration: "none", color: "#3366FF", alignContent: "center", paddingLeft: "20px" }}>Search cards</RouterLink>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => <Button type="primary">Print</Button>}
          />
        </Box>
      </Card>
      <Box
        ref={ref}
        id="print-container"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Card sx={{ width: { sm: "40%", xs: "100%" }, mt: 1 }}>
          <CardContent>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: "600", color: "red" }}
                  >
                    I.D. No.:
                  </Box>
                  <Box component="span" sx={{ pl: "5px" }}>
                    {dataRow.id}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  alt={dataRow.name}
                  image={dataRow.profile_pic}
                  sx={{ objectFit: "fill", width: "100%", height: "100px" }}
                />
                <Box
                  sx={{
                    background: "white",
                    paddingTop: "10px",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "80px", width: "100%" }}
                    value={`${window.location.origin}/cards/search`}
                    viewBox={`0 0 256 256`}
                  />
                </Box>
              </Grid>
              <Grid item xs={9} sx={{ pl: 1 }}>
                <Grid item xs={12} sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    alt="logo"
                    image={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                    sx={{ objectFit: "fill", width: "90px", height: "60px" }}
                  />
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ color: "#0f4c8d", fontWeight: "600", textTransform: 'uppercase', fontSize: '0.8rem', ml:.5 }}
                  >
                    SAFETY INTERNATIONAL COMPANY FOR INSPECTION
                  </Typography>
                  <CardMedia
                    component="img"
                    alt="logo"
                    image={`${process.env.PUBLIC_URL}/assets/images/safetyLogo.png`}
                    sx={{ objectFit: "fill", width: "80px", height: "50px" }}
                  />
                </Grid>
                <Grid container sx={{ pl: "10px" }}>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "600" }}>Name :</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dataRow.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Iqama No. :
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dataRow.iqama_number}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ pt: 0 }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Company :
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ pt: 0 }}>
                    <Typography>{dataRow.company}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ pt: 0 }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Issued on :
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ pt: 0 }}>
                    <Typography>{formatDate(dataRow.issue_date)}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ pt: 0 }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Valid up to :
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ pt: 0 }}>
                    <Typography>{formatDate(dataRow.expiry_date)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "center",
                  backgroundColor: "#0f4c8d",
                  color: "white",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ mt: "5px", mb: "5px" }}
                >
                  {dataRow.certified_as}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ width: { sm: "40%", xs: "100%" }, mt: 2 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={7} sx={{ pr: 1 }}>
                <Typography sx={{ lineHeight: 1.25, fontSize: ".5rem" }}>
                  This card is issued by and remains the property of Safety
                  International Company For Inspection
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.25,
                    mt: 2,
                    fontSize: ".75rem",
                  }}
                >
                  The holder of this card has been successfully completed the
                  training session on safety, stability and safe operation of
                  the equipment(s) listed on the other side.
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.25,
                    mt: 2,
                    fontSize: ".75rem",
                  }}
                >
                  Examiner: {dataRow.examiner}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    alt="logo"
                    image={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                    sx={{ objectFit: "fill", width: "60px", height: "60px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "10px" }}>
                    Kingdom of Saudi Arabia - jeddah Hai Al-Ameer fawaz Almonzer
                    Ibn Al-harith Street: 2718-22441
                  </Typography>
                  <Typography sx={{ fontSize: ".75rem" }}>
                    Tel: 012-2154356
                  </Typography>
                  <Typography sx={{ fontSize: ".75rem" }}>
                    Email: info@alamancom.com
                  </Typography>
                  <Typography sx={{ fontSize: ".75rem" }}>
                    Web:{" "}
                    <Link href="https://alamancom.com/">
                      alamancom.com
                    </Link>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ fontWeight: 600, textDecoration: "underline" }}
                >
                  Disclaimer:
                </Typography>
                <Typography sx={{ fontSize: ".75rem" }}>
                  SIIC accepts no liability for any errors committed by the
                  holder of this card whilst attending the categorized duty
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography sx={{ color: "red" }}>
                  THIS IS NOT A SAUDI ARABIAN GOVERNMENT LICENSE
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

CardView.defaultProps = {
  title: "",
  dataRow: {},
};

export default CardView;
