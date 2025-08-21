import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Avatar, Grid, Switch, Stack } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import Modal from "../Modal/Index";
import DataGridComponent from "../../atoms/DataGrid";

const CardList = ({
  rows,
  severity,
  message,
  paginationModel,
  updateStatus,
  onDeleteHandler,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "Job No",
      minWidth: 80,
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: "profile_pic",
      headerName: "Profile",
      type: "actions",
      minWidth: 80,
      flex: 1,
      getActions: (params) => {
        const { profile_pic, name } = params.row;
        if (profile_pic) {
          const basePath =
            process.env.REACT_APP_ENV === "local"
              ? process.env.REACT_APP_GATEWAY_LOCAL
              : process.env.REACT_APP_GATEWAY_LIVE;
          const imageSrc = `${basePath}/images/profile/${profile_pic}`;
          return [
            <Avatar alt={name} src={imageSrc} sx={{ width: 56, height: 56 }} />,
          ];
        } else {
          return [<Avatar>{name[0].toUpperCase()}</Avatar>];
        }
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "iqama_number",
      headerName: "Iqama number",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "issue_date",
      headerName: "Issue date",
      minWidth: 120,
      flex: 1,
      valueFormatter: (params) => {
        return formatDate(params.value)
      }
    },
    {
      field: "expiry_date",
      headerName: "Expire date",
      minWidth: 120,
      flex: 1,
      valueFormatter: (params) => {
        return formatDate(params.value)
      }
    },
    {
      field: "certified_as",
      headerName: "Certified As",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      type: "status",
      headerName: "Status(In-Active/Active)",
      minWidth: 180,
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
      minWidth: 120,
      flex: 1,
      getActions: (params) => {
        const actions = [];
        const { view, edit, remove } = params.row?.action;
        if (view) {
          actions.push(
            <a href={`/cards/view/${params.row._id}`} target="__blank">
              <VisibilityIcon sx={{ fontSize: 25 }} />
            </a>
          );
        }
        if (edit) {
          actions.push(
            <Link to={`/cards/edit/${params.row._id}`}>
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

CardList.defaultProps = {
  rows: [],
  paginationModel: {
    pageSize: 10,
  },
  pageSizeOptions: 10,
  updateStatus: () => {},
  onDeleteHandler: () => {},
};

export default CardList;
