import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Alert, Grid, Stack, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { formatDate } from "../../../utils/utils";

import Modal from "../Modal/Index";

import DataGridComponent from "../../atoms/DataGrid";

const InvoiceList = ({
  rows,
  severity,
  message,
  updateStatus,
  paginationModel,
  onDeleteHandler,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "Certificate No",
      minWidth: 150,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "user",
      headerName: "Created By",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "business_name",
      headerName: "Business name",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "inspection_date",
      headerName: "Inspection date",
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) => {
        return formatDate(params.value)
      }
    },
    {
      field: "inspection_next_date",
      headerName: "Inspection next date",
      minWidth: 200,
      flex: 1,
      valueFormatter: (params) => {
        return formatDate(params.value)
      }
    },
    {
      field: "inspector_name",
      headerName: "inspector name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status(In-Active/Active)",
      minWidth: 200,
      flex: 1,
      renderCell: (cellValues) => {
        const {
          value,
          id,
          row: {
            action: { changeStatus },
          },
        } = cellValues;
        const isActive = value === "INACTIVE" ? false : true;
        const switchProps = {
          inputProps: { "aria-label": "Switch status" },
        };
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Switch
              {...switchProps}
              checked={isActive}
              onChange={() => updateStatus(id)}
              disabled={!changeStatus}
            />
          </Stack>
        );
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      getActions: (params) => {
        const actions = [];
        const { view, edit, remove } = params.row?.action;
        if (view) {
          actions.push(
            <a href={`/certificate/view/${params.row._id}`} target="__blank">
              <VisibilityIcon sx={{ fontSize: 25 }} />
            </a>
          );
        }
        if (edit) {
          actions.push(
            <Link to={`/certificate/edit/${params.row._id}`}>
              <EditIcon sx={{ fontSize: 25 }} />
            </Link>
          );
        }
        if (remove) {
          actions.push(
            <DeleteIcon
              fontSize="medium"
              onClick={() => onDeleteHandler(params.row._id)}
            />
          );
        }
        return actions;
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

InvoiceList.defaultProps = {
  rows: [],
  paginationModel: {
    pageSize: 10,
  },
  pageSizeOptions: 10,
  updateStatus: () => {},
  onDeleteHandler: () => {},
};

export default InvoiceList;
