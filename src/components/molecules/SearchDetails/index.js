import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Typography,
  Card,
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
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
  const [searchField, setSearchField] = useState("");
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

  return (
    <Container maxWidth={false} sx={{ maxWidth: "800px" }}>
      <Card sx={{ mt: 10, border: 1, borderColor: "primary.dark" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h1" gutterBottom sx={{ marginTop: "20px" }}>
            {`Search ${pageType}`}
          </Typography>
           <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Grid item xs={12}>
                {severity && message && (
                  <Grid item xs={12}>
                    <Alert variant="standard" severity={severity} sx={{ width: "100%", mt: 1 }}>
                      {message}
                    </Alert>
                  </Grid>
                )}
              </Grid>
              </Box>
          <Box sx={{ width: "320px", margin: "20px auto", display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              {/* Search Field Dropdown */}
              <TextField
                select
                label="Search By"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                {searchOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Search Input */}
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 300 }}
              />

              {/* Search Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={isSearchDisabled}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default SearchDetails;
