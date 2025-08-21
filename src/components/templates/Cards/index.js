import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import Loader from "../../../components/atoms/Loader";
import PageTitle from "../../atoms/PageTitle";
import CardList from "../../molecules/CardList";
import { onClose, onOpen } from "../../../redux-toolkit/reducers/modal";
import { CARD_LIST } from "../../../constants/Query";
import { CHANGE_CARD_STATUS, DELETE_CARD } from "../../../constants/Mutation";

const Cards = () => {
  const dispatch = useDispatch();
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [cardList, { loading, data, error }] = useLazyQuery(CARD_LIST);
  const [
    changeCardStatus,
    { loading: c_loading, error: c_error, data: c_data },
  ] = useMutation(CHANGE_CARD_STATUS);
  const [removeCard, { loading: r_loading, error: r_error, data: r_data }] =
    useMutation(DELETE_CARD);

  // Get Certificate list response
  React.useEffect(() => {
    if (!loading && data && !error) {
      const { response } = data.cardList;
      setRows(response);
    }
  }, [loading, data, error, setRows]);

  // Retrive data
  const retriveData = React.useCallback(() => cardList(), [cardList]);

  React.useEffect(() => {
    retriveData();
  }, [retriveData]);

  React.useEffect(() => {
    if (!c_loading && !c_error && c_data) {
      const response = c_data.changeCardStatus;
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
    changeCardStatus({
      variables: { input: { id: parseInt(id) } },
    });
  };

  React.useEffect(() => {
    if (!r_loading && !r_error && r_data) {
      const response = r_data.removeCard;
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

  const removeCardHandler = (_id) => {
    removeCard({
      variables: { input: { _id } },
    });
  };

  const handleClose = () => {
    dispatch(onClose());
  };
  const DeleteCardBodyContent = () => (
    <Typography gutterBottom>
      <Typography>Are you want to sure?</Typography>
    </Typography>
  );
  const DeleteModalActions = ({ _id }) => (
    <>
      {" "}
      <Button autoFocus onClick={() => removeCardHandler(_id)}>
        Confirm
      </Button>
      <Button onClick={() => handleClose()}>Cancel</Button>
    </>
  );
  const onDeleteHandler = (_id) => {
    dispatch(
      onOpen({
        isOpen: true,
        title: "Delete Card",
        hasClosedIcon: true,
        handleClose,
        bodyContent: <DeleteCardBodyContent />,
        modalActions: <DeleteModalActions _id={_id} />,
      })
    );
  };

  const cardListProps = {
    rows,
    severity,
    message,
    onDeleteHandler,
    paginationModel: {
      pageSize: process.env.REACT_APP_PAGE_LIMIT,
    },
    pageSizeOptions: process.env.REACT_APP_PAGE_LIMIT,
    updateStatus,
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
          title="Card List"
          buttonTitle="Create Card"
          url="/cards/create"
        />
      </Grid>

      {loading && !data ? <Loader /> : <CardList {...cardListProps} />}
    </>
  );
};

export default Cards;
