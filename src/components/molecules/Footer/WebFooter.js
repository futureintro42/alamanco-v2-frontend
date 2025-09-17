// src/components/Footer.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  ArrowForwardIos,
} from "@mui/icons-material";

const WebFooter = () => {
  const NavLinks = [
    { key: "Home", to: "https://alamanextuv.com/" },
    { key: "About the company", to: "https://alamanextuv.com/ar/about.html" },
    { key: "Our Services", to: "https://alamanextuv.com/ar/services.html" },
    { key: "Contact Us", to: "https://alamanextuv.com/ar/contact.html" },
  ];
  return (
    <Box component="footer" sx={{ bgcolor: "#1f4074", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        {/* Top Icons Row */}
        <Grid container justifyContent="space-between" alignItems="center">
          {["support", "service", "guranty", "elite_service"].map((item) => (
            <Box
              key={item}
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/images/${item}.png`}
              alt={item}
              sx={{ height: 80, width: 80 }}
            />
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 4 }} />

        {/* Main Footer Sections */}
        <Grid container spacing={4}>
          {/* Contact Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "bold"}}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">
                  Kingdom of Saudi Arabia,
                  Jeddah, Prince Fawaz District,
                  Al-Mundhir Bin Al-Harith Street
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone fontSize="small" />
                <Typography variant="body2">0508001034</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone fontSize="small" />
                <Typography variant="body2">0508001094</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Email fontSize="small" />
                <Typography variant="body2">Info@Alamanextuv.com</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Our Services */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "bold"}}>
              Our Services
            </Typography>
            <Stack spacing={1}>
              {[
                "Inspection and Testing",
                "Certificate",
                "Safety and Security Consulting",
                "Safety Training",
              ].map((service, i) => (
                <Box key={i} display="flex" alignItems="center" gap={1}>
                  <ArrowForwardIos sx={{ fontSize: 12 }} />
                  <Typography variant="body2">{service}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Important Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "bold"}}>
              Important Links
            </Typography>
            <Stack spacing={1}>
              {NavLinks.map(
                (link, i) => (
                  <Link
                    key={link.key}
                    href={link.to}
                    underline="hover"
                    color="inherit"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 12 }} />
                    <Typography variant="body2">{link.key}</Typography>
                  </Link>
                )
              )}
            </Stack>
          </Grid>

          {/* About the Company */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: "bold"}}>
              About the Company
            </Typography>
            <Typography variant="body2">
              We provide TUV inspection, certification and testing services for
              cranes, heavy equipment and trucks to confirm compliance with all
              laws and ensure inspection standards are met. Our years of
              experience and prompt inspections help extend operating life and
              reduce company risks. We have equipment insurance.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 4 }} />

        {/* Bottom Row */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
          gap={2}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()}{" "}
            <Link color="inherit" href="/#">
              SAFETY International Company For Inspection
            </Link>
            . All Rights Reserved.
          </Typography>

          {/* Social Icons */}
          <Box>
            <IconButton color="inherit" href="/#" size="small">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="/#" size="small">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="/#" size="small">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" href="/#" size="small">
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WebFooter;
