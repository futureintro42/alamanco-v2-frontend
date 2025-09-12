import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Typography,
  Card,
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
  CardContent,
  CardActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FIND_CARD_BY_SEARCH, FIND_INVOICE_BY_SEARCH } from "../../../constants/Query";

const SEARCH_FIELDS = {
  cards: [
    { value: "id", label: "Id No." },
    { value: "iqama_number", label: "Iqama No." },
  ],
  certificate: [
    { value: "id", label: "Certificate No." },
    { value: "sticker_number", label: "Sticker No." },
    { value: "reference_number", label: "Reference No." },
  ],
};

const SearchDetails = ({ pageType }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("id");
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  // Queries
  const [findCardBySearch, { loading: cardLoading, data: cardData, error: cardError }] =
    useLazyQuery(FIND_CARD_BY_SEARCH);
  const [findInvoiceBySearch, { loading: certLoading, data: certData, error: certError }] =
    useLazyQuery(FIND_INVOICE_BY_SEARCH);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchField || !searchTerm.trim()) return;

    const variables = { input: { attribute: searchField, value: searchTerm } };
    if (pageType === "cards") findCardBySearch({ variables });
    if (pageType === "certificate") findInvoiceBySearch({ variables });
  };

  // Handle response for both queries
  useEffect(() => {
    const handleResponse = (data, error) => {
      if (!data || error) return;
      const response = pageType === "cards" ? data.findCardBySearch : data.findInvoiceBySearch;
      setSeverity(response.severity);
      setMessage(response.message);
      if (response.severity?.includes("success")) {
        navigate(`/${pageType}/view/${response?.response?._id}`);
      }
    };

    if (pageType === "cards" && !cardLoading) handleResponse(cardData, cardError);
    if (pageType === "certificate" && !certLoading) handleResponse(certData, certError);
  }, [cardLoading, certLoading, cardData, certData, cardError, certError, pageType, navigate]);

  const searchOptions = SEARCH_FIELDS[pageType] || [];
  const isSearchDisabled = !searchField || !searchTerm.trim();
  const handleDashboard = () => {
    if(pageType){
    navigate(`/${pageType.toLowerCase()}`);
    }
  }
  const handleSearchRedirect = () => {
    let redirectURL = "certificate";
    if(pageType === "certificate"){
      redirectURL = "cards"
    }
    setSearchTerm("");
    setSearchField("id");
    navigate(`/${redirectURL}/search`);
  }

  return (
    <Container maxWidth={false} sx={{ maxWidth: "800px" }}>
      <Card sx={{ mt: 10, border: 1, borderColor: "primary.dark" }}>
        <CardActions>
            <Button size="small" onClick={handleDashboard}>{`${pageType} List`}</Button>
            <Button size="small" onClick={handleSearchRedirect}>{`${pageType === "cards" ? 'Certificate': 'Cards'}`} Search</Button>
          </CardActions>
        <CardContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="h1" gutterBottom sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {`Search ${pageType}`}
          </Typography>
          </Grid>
            <Grid item xs={12}>
              {severity && message && (
                <Grid item xs={12}>
                  <Alert variant="standard" severity={severity} sx={{ width: "100%", mt: 1 }}>
                    {message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          <Grid item xs={12}>
              <form onSubmit={handleSearch}>
                <Grid container spacing={2}>
                  {/* Dropdown */}
                  <Grid item xs={12} sm={5}>
                    <TextField
                      select
                      label="Search By"
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                      fullWidth
                    >
                      {searchOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Search Input */}
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Search"
                      variant="outlined"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  {/* Search Button */}
                  <Grid item xs={12} sm={2} display="flex" alignItems="center">
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                      disabled={isSearchDisabled}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
          </Grid>
          </Grid>
          </CardContent>
      </Card>
    </Container>
  );
};

export default SearchDetails;
