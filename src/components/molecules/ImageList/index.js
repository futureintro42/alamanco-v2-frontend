import { Card, CardMedia, Grid, Box } from "@mui/material";

const ImageList = () => {
  const images = [
    `${process.env.PUBLIC_URL}/assets/images/slider1.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/slider2.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/slider3.jpeg`,
  ];

  return (
    <Box sx={{p: 0, mt: 4, bgcolor: "#f9f9f9" }} disableGutters>
      <Grid container spacing={2} justifyContent="center">
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid #eee",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 250, // fixed card height
                bgcolor: "#fff",
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`carousel-${index}`}
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain", // ensures full image fits
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageList;
