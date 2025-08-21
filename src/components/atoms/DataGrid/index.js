import React from "react";
import { isEmpty } from "lodash";
import { Box, Stack } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

const ODD_OPACITY = .5;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
  },
  "& .MuiDataGrid-columnHeaders": {
    minHeight: 0,
    maxHeight: 0,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    overflow: "visible",
  },
  "& .MuiDataGrid-cellContent": {
    whiteSpace: "break-spaces",
    wordBreak: "break-all",
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: alpha(theme.palette.secondary.light, 0.2),
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.2),
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const NoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Data Available
    </Stack>
  );
};

const DataGridComponent = (props) => {
  const {
    rows,
    columns,
    setSelectedRows,
    css = {},
    minHeight = 130,
    pageSize = 10,
    checkboxSelection = true,
    hideFooterPagination = false,
    hideFooter = false,
    autoHeight = true,
    ...other
  } = props;
  const height = !isEmpty(css) ? css : { minHeight };
  return (
    <Box sx={{ ...height, width: "100%", display: "flex" }}>
      <StripedDataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        autoHeight={autoHeight}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        hideFooter={hideFooter}
        hideFooterPagination={hideFooterPagination}
        disableColumnSelector={true}
        disableSelectionOnClick
        disableColumnMenu={true}
        disableColumnFilter={true}
        rowHeight={50}
        experimentalFeatures={{ newEditingApi: false }}
        components={{ NoRowsOverlay }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          setSelectedRows(selectedIDs);
        }}
        sx={{
          "&.MuiDataGrid-virtualScrollerContent--overflowed": {
            overflow: "visible",
            width: "100%",
          },
          "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator":
            {
              display: "none",
            },
        }}
        {...other}
      />
    </Box>
  );
};

export default DataGridComponent;
