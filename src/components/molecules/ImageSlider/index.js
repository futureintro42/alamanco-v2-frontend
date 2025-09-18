import React, { useState } from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const sliderImages = [
    `${process.env.PUBLIC_URL}/assets/images/slider1.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/slider2.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/slider3.jpeg`,
];

const ImageCarousel = ({ images = sliderImages }) => {
  const [scrollX, setScrollX] = useState(0);

  const scrollLeft = () => {
    const newX = Math.max(scrollX - 1, 0);
    setScrollX(newX);
  };

  const scrollRight = () => {
    const maxScroll = Math.max(images.length - 3, 0);
    const newX = Math.min(scrollX + 1, maxScroll);
  setScrollX(newX);
  };

  return (
    <Box sx={{ position: "relative", width: "100%", mt: 4 }}>
      {/* Carousel wrapper with padding */}
      <Box sx={{ display: "flex", width: "100%", pl: 1, pr: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            transform: `translateX(-${scrollX * (100 / 3)}%)`,
            transition: "transform 0.5s ease-in-out",
            width: `${(images.length / 3) * 100}%`,
          }}
        >
          {images.map((img, index) => (
            <Card
              key={index}
              sx={{
                flex: "0 0 calc(33.33% - 16px)",
                borderRadius: 1, // 4px
                border: "1px solid #fff",
                boxShadow: "5px 5px 5px 5px #00000024",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                overflow: "hidden", // keeps image inside rounded corners
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`carousel-${index}`}
                sx={{
                  maxHeight: 200,
                  width: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Card>
          ))}
        </Box>
      </Box>

      {/* Arrows */}
      {images.length > 3 && (
        <>
          <IconButton
            onClick={scrollLeft}
            disabled={scrollX === 0}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={scrollRight}
            disabled={scrollX >= images.length - 3}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;
