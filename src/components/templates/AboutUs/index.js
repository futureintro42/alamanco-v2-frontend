import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import WebLayout from "../WebLayout";
import AboutUs from "../../molecules/AboutUs";

const About = () => {
    const location = useLocation();
    const pageType = location.pathname.split("/")[1];
    return <WebLayout pageTitle={pageType?.toUpperCase()}>
    <Grid container>
        <Grid item xs={12}>
            <AboutUs />
        </Grid>
    </Grid>
    </WebLayout>
}

export default About