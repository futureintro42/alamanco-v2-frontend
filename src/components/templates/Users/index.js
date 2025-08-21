import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";

import Loader from "../../../components/atoms/Loader";
import PageTitle from "../../atoms/PageTitle";
import UsersList from "../../molecules/UserList";
import { USER_LIST } from "../../../constants/Query";
import { onOpen, onClose } from "../../../redux-toolkit/reducers/modal";
import { CHANGE_STATUS, DELETE_USER } from "../../../constants/Mutation";

const Users = () => {
  const dispatch = useDispatch();
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [showItem, setShowItem] = React.useState("ACTIVE");
  const [userList, { loading, data, error }] = useLazyQuery(USER_LIST);
  const [changeStatus, { loading: c_loading, error: c_error, data: c_data }] =
    useMutation(CHANGE_STATUS);
  const [removeUser, { loading: r_loading, error: r_error, data: r_data }] =
    useMutation(DELETE_USER);

  // Get User list response
  React.useEffect(() => {
    if (!loading && data && !error) {
      const { response } = data.userList;
      setRows(response);
    }
  }, [loading, data, error, setRows]);

  // Retrive data
  const retriveData = React.useCallback(
    () =>
      userList({
        variables: {
          input: { search: { status: showItem === "ALL" ? "" : showItem } },
        },
      }),
    [showItem, userList]
  );

  React.useEffect(() => {
    retriveData();
  }, [retriveData]);

  React.useEffect(() => {
    if (!c_loading && !c_error && c_data) {
      const response = c_data.changeStatus;
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

  React.useEffect(() => {
    if (!r_loading && !r_error && r_data) {
      const response = r_data.removeUser;
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

  const updateStatus = (id) => {
    changeStatus({
      variables: { input: { id: parseInt(id) } },
    });
  };
  const removeUserHandler = (id) => {
    removeUser({
      variables: { input: { id: parseInt(id) } },
    });
  };
  const handleClose = () => {
    dispatch(onClose());
  };

  const DeleteUserBodyContent = () => (
    <Typography gutterBottom>
      <Typography>Are you want to sure?</Typography>
    </Typography>
  );
  const DeleteModalActions = ({ id }) => (
    <>
      {" "}
      <Button autoFocus onClick={() => removeUserHandler(id)}>
        Confirm
      </Button>
      <Button onClick={() => handleClose()}>Cancel</Button>
    </>
  );
  const onDeleteHandler = (id) => {
    dispatch(
      onOpen({
        isOpen: true,
        title: "Delete user",
        hasClosedIcon: true,
        handleClose,
        bodyContent: <DeleteUserBodyContent />,
        modalActions: <DeleteModalActions id={id} />,
      })
    );
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    const currentItem = e?.target?.value;
    setShowItem(currentItem);
    userList({
      variables: {
        input: { search: { status: currentItem === "ALL" ? "" : currentItem } },
      },
    });
  };

  const userListProps = {
    rows,
    onDeleteHandler,
    updateStatus,
    severity,
    message,
    paginationModel: {
      pageSize: process.env.REACT_APP_PAGE_LIMIT,
    },
    pageSizeOptions: process.env.REACT_APP_PAGE_LIMIT,
    showItem,
    setShowItem,
    handleDropdownChange,
  };

  return (
    <>
      <PageTitle title="User List" />
      {loading && !data ? <Loader /> : <UsersList {...userListProps} />}
    </>
  );
};

export default Users;
