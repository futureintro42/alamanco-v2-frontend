import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  `${process.env.PUBLIC_URL}/assets/images/banner1.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner2.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner3.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner4.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner5.jpeg`,
  `${process.env.PUBLIC_URL}/assets/images/banner6.jpg`,
];

const PageBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Images wrapper */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 1s ease-in-out",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              height: { xs: "300px", md: "500px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#000", // fallback in case image doesn't fill
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`banner-${index}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // options: "cover", "contain", "fill"
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Left/Right Buttons */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.7)",
          "&:hover": { background: "rgba(255,255,255,0.9)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.7)",
          "&:hover": { background: "rgba(255,255,255,0.9)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Dots navigation */}
      <Box
        sx={{
          position: "absolute",
          bottom: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? "14px" : "10px",
              height: current === index ? "14px" : "10px",
              borderRadius: "50%",
              background: current === index ? "#1f4074" : "white",
              margin: "0 5px",
              cursor: "pointer",
              transition: "all 0.4s ease",
              border: "1px solid #1f4074",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PageBanner;
