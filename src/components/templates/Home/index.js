import { Grid } from "@mui/material";
import WebLayout from "../WebLayout";
import HomeDetails from "../../molecules/Home";

const Home = () => {
    return <WebLayout isHome={true}>
    <Grid container>
        <Grid item xs={12}>
            <HomeDetails />
        </Grid>
    </Grid>
    </WebLayout>
}

export default Home