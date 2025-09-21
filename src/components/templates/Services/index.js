import { Grid } from "@mui/material";
import WebLayout from "../WebLayout";
import ServicesDetails from "../../molecules/Services";

const Services = () => {
    return <WebLayout pageTitle="Our Services">
    <Grid container>
        <Grid item xs={12}>
            <ServicesDetails />
        </Grid>
    </Grid>
    </WebLayout>
}

export default Services