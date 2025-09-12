import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import SearchDetails from "../../molecules/SearchDetails";
import AuthHeader from "../../molecules/Header/AuthHeader";
import AuthFooter from "../../molecules/Footer/AuthFooter";

const Search = () => {
    const location = useLocation();
    const pageType = location.pathname.split("/")[1];
    return <>
    <AuthHeader />
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <SearchDetails pageType={pageType} />
        </Grid>
    </Grid>
    <AuthFooter />
    </>
}

export default Search