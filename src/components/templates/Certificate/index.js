import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";

import Loader from "../../../components/atoms/Loader";
import PageTitle from "../../atoms/PageTitle";
import InvoiceList from "../../molecules/InvoiceList";
import { onClose, onOpen } from "../../../redux-toolkit/reducers/modal";
import { INVOICE_LIST } from "../../../constants/Query";
import {
  CHANGE_INVOICE_STATUS,
  DELETE_INVOICE,
} from "../../../constants/Mutation";

const Certificate = () => {
  const dispatch = useDispatch();
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [invoiceList, { loading, data, error }] = useLazyQuery(INVOICE_LIST);
  const [
    changeInvoiceStatus,
    { loading: c_loading, error: c_error, data: c_data },
  ] = useMutation(CHANGE_INVOICE_STATUS);
  const [removeInvoice, { loading: r_loading, error: r_error, data: r_data }] =
    useMutation(DELETE_INVOICE);

  // Get Certificate list response
  React.useEffect(() => {
    if (!loading && data && !error) {
      const { response } = data.invoiceList;
      setRows(response);
    }
  }, [loading, data, error, setRows]);

  // Retrive data
  const retriveData = React.useCallback(() => invoiceList(), [invoiceList]);

  React.useEffect(() => {
    retriveData();
  }, [retriveData]);

  React.useEffect(() => {
    if (!c_loading && !c_error && c_data) {
      const response = c_data.changeInvoiceStatus;
      setSeverity(response.severity);
      setMessage(response.message);
      if (!response.hasError) {
        retriveData();
      }
      dispatch(onClose());
    }
  }, [
    c_loading,
    c_error,
    c_data,
    dispatch,
    setSeverity,
    setMessage,
    retriveData,
  ]);

  const updateStatus = (id) => {
    changeInvoiceStatus({
      variables: { input: { id: parseInt(id) } },
    });
  };

  React.useEffect(() => {
    if (!r_loading && !r_error && r_data) {
      const response = r_data.removeInvoice;
      setSeverity(response.severity);
      setMessage(response.message);
      if (!response.hasError) {
        retriveData();
      }
      dispatch(onClose());
    }
  }, [
    r_loading,
    r_error,
    r_data,
    dispatch,
    setSeverity,
    setMessage,
    retriveData,
  ]);

  const removeInvoiceHandler = (_id) => {
    removeInvoice({
      variables: { input: { _id } },
    });
  };

  const handleClose = () => {
    dispatch(onClose());
  };
  const DeleteInvoiceBodyContent = () => (
    <Typography gutterBottom>
      <Typography>Are you want to sure?</Typography>
    </Typography>
  );
  const DeleteModalActions = ({ _id }) => (
    <>
      {" "}
      <Button autoFocus onClick={() => removeInvoiceHandler(_id)}>
        Confirm
      </Button>
      <Button onClick={() => handleClose()}>Cancel</Button>
    </>
  );
  const onDeleteHandler = (_id) => {
    dispatch(
      onOpen({
        isOpen: true,
        title: "Delete Cartificate",
        hasClosedIcon: true,
        handleClose,
        bodyContent: <DeleteInvoiceBodyContent />,
        modalActions: <DeleteModalActions _id={_id} />,
      })
    );
  };

  const invoiceListProps = {
    rows,
    updateStatus,
    onDeleteHandler,
    severity,
    message,
    paginationModel: {
      pageSize: process.env.REACT_APP_PAGE_LIMIT,
    },
    pageSizeOptions: process.env.REACT_APP_PAGE_LIMIT,
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
        <PageTitle
          title="Certificate List"
          buttonTitle="Create Certificate"
          url="/certificate/create"
        />
      </Grid>

      {loading && !data ? <Loader /> : <InvoiceList {...invoiceListProps} />}
    </>
  );
};

export default Certificate;
