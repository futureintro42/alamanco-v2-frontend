import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import WebLayout from "../WebLayout";
import SearchDetails from "../../molecules/SearchDetails";

const Search = () => {
    const location = useLocation();
    const pageType = location.pathname.split("/")[1];
    return <WebLayout pageTitle={pageType?.toUpperCase()}>
    <Grid container spacing={0}>
        <Grid item xs={12}>
            <SearchDetails pageType={pageType} />
        </Grid>
    </Grid>
    </WebLayout>
}

export default Search