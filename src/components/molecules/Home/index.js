import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServicesDetails from "../Services";



const HomeDetails = () => {
    const navigate = useNavigate();
    return <Grid container spacing={4}>
        {/* Services Section */}
        <Grid item xs={12}>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                mb={4}
                color="#1f4074"
            >
                Our Services
            </Typography>
            <ServicesDetails />
            <Box textAlign="center" mt={4}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/services")}
                    sx={{ borderRadius: "25px", px: 4, py: 1.2 }}
                >
                    View All Services
                </Button>
            </Box>
        </Grid>
        {/* About Section */}
        <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={`${process.env.PUBLIC_URL}/assets/images/aboutus.png`}
                            alt="About Us"
                            sx={{
                                width: "100%",
                                height: "400px",
                                borderRadius: 2,
                                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                                objectFit: "fill"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mb={2}
                            color="#1f4074"
                        >
                            About Our Company
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            We are a trusted provider of inspection, testing, calibration,
                            safety assurance, and training services. With international
                            expertise and commitment to quality, we help industries ensure
                            compliance and operational excellence.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/about-us")}
                            sx={{ borderRadius: "25px", px: 4, py: 1 }}
                        >
                            Learn More
                        </Button>
                    </Grid>
        {/* Call To Action */}
        <Grid item xs={12}>
            <Box
                sx={{
                    py: 8,
                    bgcolor: "#1f4074",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container>
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                        Ready to Work With Us?
                    </Typography>
                    <Typography variant="body1" mb={4} sx={{ opacity: 0.9 }}>
                        Contact us today for reliable inspection, testing, and training
                        services tailored to your needs.
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "white",
                                color: "#1f4074",
                                borderRadius: "25px",
                                px: 4,
                                py: 1,
                                "&:hover": { bgcolor: "#f0f0f0" },
                            }}
                            onClick={() => navigate("/contact-us")}
                        >
                            Contact Us
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Grid>
    </Grid>
}

export default HomeDetails