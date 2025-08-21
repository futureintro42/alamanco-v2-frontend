import React from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import UpdateProfileForm from "./UpdateProfileForm";
import { FIND_PROFILE_DETAIL } from "../../../constants/Query";

// ================================|| LOGIN ||================================ //

const ProfileDetails = () => {
  const { id } = useParams();
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [showProfileForm, setShowProfileForm] = React.useState(false);
  const [details, setDetails] = React.useState({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    status: "",
    role: "",
  });
  const [userDetails, { loading, error, data }] =
    useLazyQuery(FIND_PROFILE_DETAIL);

  React.useEffect(() => {
    userDetails({ variables: { input: { _id: id } } });
  }, [id, userDetails]);

  // Response: Loads data
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.userDetails;
      if (!response.response) {
        setSeverity("error");
        setMessage("Sorry, Record does not exist.");
      } else {
        setSeverity("");
        setMessage("");
        const { _id, first_name, last_name, email, role, status } =
          response.response;
        setDetails({
          _id,
          first_name,
          last_name,
          email,
          role,
          status: status.toLowerCase(),
        });
      }
    }
  }, [loading, error, data]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setShowProfileForm(!showProfileForm);
  };
  return (
    <Container sx={{p:0}}>
      <Card>
        <CardContent>
          <Grid item xs={12}>
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
          {details.first_name && (
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" component="h5">
                      First Name
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" component="h5">
                      {details.first_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5" component="h5">
                      Last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" component="h5">
                      {details.last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5" component="h5">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" component="h5">
                      {details.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5" component="h5">
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {details.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button variant="text" onClick={handleUpdateProfile}>
                      {showProfileForm ? "Cancel Profile" : "Update profile"}
                    </Button>
                  </Grid>
                  {showProfileForm && (
                    <Grid item xs={12}>
                      <UpdateProfileForm {...details} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileDetails;
