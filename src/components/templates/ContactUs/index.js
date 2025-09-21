import { Grid } from "@mui/material";
import WebLayout from "../WebLayout";
import ContactUs from "../../molecules/ContactUs";

const Contact = () => {
    return <WebLayout pageTitle="Contact us">
    <Grid container>
        <Grid item xs={12}>
            <ContactUs />
        </Grid>
    </Grid>
    </WebLayout>
}

export default Contact