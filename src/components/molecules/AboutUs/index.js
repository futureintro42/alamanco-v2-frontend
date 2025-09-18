import { Grid, Box, Typography, Stack } from "@mui/material";
import {
    ArrowForwardIos,
} from "@mui/icons-material";

const AboutUs = () => {
    return <Grid container>
        <Grid item xs={12} md={6}>
            <Box
                component="img"
                sx={{ height: '400px', width: '100%', mr: 1.5 }}
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/images/aboutus.png`}
            />
        </Grid>
        <Grid item xs={12} md={5} sx={{ml: {xs: 0, md: 4}}}>
            <Typography variant="body1">
                We provide inspection, certification and testing services for
                cranes, heavy equipment and trucks to confirm compliance with all
                laws and ensure inspection standards are met. Our years of
                experience and prompt inspections help extend operating life and
                reduce company risks. We have equipment insurance.
            </Typography>
            <Stack spacing={1} sx={{mt:4}}>
                {[
                    "Inspection and Testing",
                    "Certificate",
                    "Safety and Security Consulting",
                    "Safety Training",
                ].map((service, i) => (
                    <Box key={i} display="flex" alignItems="center" gap={1}>
                        <ArrowForwardIos sx={{ fontSize: 10, letterSpacing: 1.5 }} />
                        <Typography variant="body1" sx={{ fontSize: 20, letterSpacing: 1.5 }}>{service}</Typography>
                    </Box>
                ))}
            </Stack>
        </Grid>
    </Grid>
}

export default AboutUs