import { Grid, Typography, Card, CardMedia, CardContent  } from "@mui/material";

const services = [
  {
    title: "Inspection & Testing",
    description: "Inspection of all types of equipment, generators, operators, elevators, chains, trucks and industrial tasks.",
    imageUrl: `${process.env.PUBLIC_URL}/assets/images/service-inspection.jpg`,
  },
  {
    title: "Lifting & Equipment",
    description: "Lifting equipment, towing equipment, electrical equipment, generators.",
    imageUrl: `${process.env.PUBLIC_URL}/assets/images/service-lifting.jpg`,
  },
  {
    title: "Safety & Security Consulting",
    description: "Consultancy in safety, security and compliance.",
    imageUrl: `${process.env.PUBLIC_URL}/assets/images/service-safety-consulting.jpg`,
  },
  {
    title: "Safety Training",
    description: "Professional safety training programs.",
    imageUrl: `${process.env.PUBLIC_URL}/assets/images/service-safety-training.jpg`,
  },
];

const ServicesDetails = () => {
    return (
      <Grid container spacing={2}>
        {services.map((svc, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                },
                height: "100%", // ensure equal height
              }}
            >
              <CardMedia
                component="img"
                image={svc.imageUrl}
                alt={svc.title}
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "fill",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#1f4074" }}
                >
                  {svc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {svc.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
}

export default ServicesDetails