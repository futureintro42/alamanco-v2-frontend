import React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DataGridComponent from "../../atoms/DataGrid";
import Modal from "../Modal/Index";
import {
  Alert,
  Grid,
  Switch,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

const UsersList = ({
  rows,
  severity,
  message,
  paginationModel,
  onDeleteHandler,
  updateStatus,
  showItem,
  handleDropdownChange,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "first_name",
      headerName: "First name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
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
        const { view, remove } = params.row?.action;
        if (view) {
          actions.push(
            <Link to={`/profile/${params.row._id}`}>
              <VisibilityIcon fontSize="medium" />
            </Link>
          );
        }
        if (remove) {
          actions.push(
            <DeleteIcon
              fontSize="medium"
              onClick={() => onDeleteHandler(params.row.id)}
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
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="show-user-label">Show User</InputLabel>
              <Select
                labelId="show-user-label"
                id="show-user-label"
                value={showItem}
                label="Show User"
                onChange={handleDropdownChange}
              >
                <MenuItem value="ACTIVE">Show Active</MenuItem>
                <MenuItem value="INACTIVE">Show Inactive</MenuItem>
                <MenuItem value="ALL">Show All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
          rowsPerPage={10}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
      <Modal />
    </>
  );
};

UsersList.defaultProps = {
  rows: [],
  paginationModel: {
    pageSize: 10,
  },
  pageSizeOptions: 10,
  onChangeStatusHandler: () => {},
  onDeleteHandler: () => {},
};

export default UsersList;
