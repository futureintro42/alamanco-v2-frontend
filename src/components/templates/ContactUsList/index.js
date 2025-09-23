import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid } from "@mui/material";

import Loader from "../../../components/atoms/Loader";
import PageTitle from "../../atoms/PageTitle";
import ContactUsListDetails from "../../molecules/ContactUsListDetails";
import { CONTACT_US_LIST } from "../../../constants/Query";

const ContactUsList = () => {
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const [getContactList, { loading, data, error }] = useLazyQuery(CONTACT_US_LIST);

  // Run query on mount
  React.useEffect(() => {
    getContactList();
  }, [getContactList]);

  // Handle response and errors
  React.useEffect(() => {
    if (loading) return;

    if (error) {
      setSeverity("error");
      setMessage("Failed to fetch contact list. Please try again later.");
      return;
    }

    if (data && data.contactList) {
      const { response } = data.contactList;

      setRows(response || []);
    }
  }, [loading, data, error]);

  const pageLimit = Number(process.env.REACT_APP_PAGE_LIMIT || 10);

  const contactListProps = {
    rows,
    severity,
    message,
    paginationModel: {
      pageSize: pageLimit,
    },
    pageSizeOptions: [pageLimit],
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle title="Contact Us List" />
      </Grid>

      {loading ? (
        <Loader />
      ) : (
        <ContactUsListDetails {...contactListProps} />
      )}
    </>
  );
};

export default ContactUsList;
