import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 👈 add this

const images = [
  `${process.env.PUBLIC_URL}/assets/images/banner1.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner2.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner3.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner4.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner5.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner6.jpg`,
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // 👈 init

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Slideshow */}
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: current === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "2rem", md: "3.5rem" },
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            mb: 2,
            animation: "fadeInUp 1.5s ease",
          }}
        >
          Welcome to SAFETY International
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            maxWidth: "800px",
            mx: "auto",
            mb: 4,
            opacity: 0.9,
            animation: "fadeInUp 2s ease",
          }}
        >
          Trusted partner in inspection, testing, safety, and professional training.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/about-us")} // 👈 redirect
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              backgroundColor: "#1f4074",
            }}
          >
            Learn More
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/contact-us")} // 👈 redirect
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              borderColor: "white",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                borderColor: "white",
              },
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroBanner;
