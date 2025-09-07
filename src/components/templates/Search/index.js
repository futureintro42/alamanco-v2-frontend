import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import SearchDetails from "../../molecules/SearchDetails";

const Search = () => {
    const location = useLocation();
    const pageType = location.pathname.split("/")[1];
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <SearchDetails pageType={pageType} />
        </Grid>
    </Grid>
}

export default Search