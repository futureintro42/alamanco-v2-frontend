import React from "react";
import Box from "@mui/material/Box";
import { Alert, Grid } from "@mui/material";
import Modal from "../Modal/Index";
import DataGridComponent from "../../atoms/DataGrid";

const ContactUsListDetails = ({
  rows,
  severity,
  message,
  paginationModel,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 80,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 80,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 80,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "subject",
      headerName: "Email Subject",
      minWidth: 100,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "message",
      headerName: "User Message",
      minWidth: 200,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Contact Date",
      minWidth: 120,
      flex: 1,
      filterable: false,
      editable: false,
      renderCell: (params) => {
        if (!params.value) return "-";
        // Convert milliseconds timestamp to readable date
        const date = new Date(Number(params.value)); 
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Grid container spacing={2}>
          {severity && message && (
            <Grid item xs={12}>
              <Alert
                variant="standard"
                severity={severity}
                sx={{ width: "100%", mt: 1 }}
              >
                {message}
              </Alert>
            </Grid>
          )}
        </Grid>
        <DataGridComponent
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel,
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection={false}
          disableRowSelectionOnClick={false}
        />
      </Box>
      <Modal />
    </>
  );
};

export default ContactUsListDetails;
