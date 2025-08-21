import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  FormHelperText,
  TextField,
  Alert,
  Avatar,
  InputLabel,
} from "@mui/material";

const CardForm = ({
  handleSubmit,
  onSubmitHandler,
  register,
  errors,
  severity,
  message,
  isSubmitted,
  title,
  submitBtnTxt,
  issue_date,
  expiry_date,
  onChangeFileHandler,
  imageSrc,
}) => {
  const navigate = useNavigate();
  return (
    <Container sx={{mb:10, p:0}}>
      <Card sx={{ borderColor: "primary.dark" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h2">
              {title}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 1 }}
              autoComplete="off"
            >
              <Grid container spacing={2}>
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
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Card Holder Name</InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Card Holder Name"
                    autoFocus
                    error={!!errors?.name?.message}
                    {...register("name")}
                  />
                  {errors?.name && (
                    <FormHelperText error id="email-error">
                      {errors?.name?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Iqama No.</InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="iqama_number"
                    required
                    fullWidth
                    id="iqama_number"
                    placeholder="Iqama No."
                    autoFocus
                    error={!!errors?.iqama_number?.message}
                    {...register("iqama_number")}
                  />
                  {errors?.iqama_number && (
                    <FormHelperText error id="email-error">
                      {errors?.iqama_number?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Issue Date</InputLabel>
                  <TextField
                    type="date"
                    autoComplete="given-name"
                    name="issue_date"
                    required
                    fullWidth
                    id="issue_date"
                    autoFocus
                    defaultValue={issue_date}
                    error={!!errors?.issue_date?.message}
                    {...register("issue_date")}
                  />
                  {errors?.issue_date && (
                    <FormHelperText error id="email-error">
                      {errors?.issue_date?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Expiry Date</InputLabel>
                  <TextField
                    type="date"
                    autoComplete="given-name"
                    name="expiry_date"
                    required
                    fullWidth
                    id="expiry_date"
                    autoFocus
                    defaultValue={expiry_date}
                    error={!!errors?.expiry_date?.message}
                    {...register("expiry_date")}
                  />
                  {errors?.expiry_date && (
                    <FormHelperText error id="email-error">
                      {errors?.expiry_date?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Certified As</InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="certified_as"
                    required
                    fullWidth
                    id="certified_as"
                    placeholder="Certified As"
                    autoFocus
                    error={!!errors?.certified_as?.message}
                    {...register("certified_as")}
                  />
                  {errors?.certified_as && (
                    <FormHelperText error id="email-error">
                      {errors?.certified_as?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Company</InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="company"
                    required
                    fullWidth
                    id="company"
                    placeholder="Company"
                    autoFocus
                    error={!!errors?.company?.message}
                    {...register("company")}
                  />
                  {errors?.company && (
                    <FormHelperText error id="email-error">
                      {errors?.company?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Examiner</InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="examiner"
                    required
                    fullWidth
                    id="examiner"
                    placeholder="Examiner"
                    autoFocus
                    error={!!errors?.examiner?.message}
                    {...register("examiner")}
                  />
                  {errors?.examiner && (
                    <FormHelperText error id="email-error">
                      {errors?.examiner?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel shrink>Upload your Pics</InputLabel>
                  <TextField
                    hiddenLabel
                    type="file"
                    name="profile_pic"
                    required
                    fullWidth
                    id="profile_pic"
                    autoFocus
                    error={!!errors?.profile_pic?.message}
                    {...register("image", {
                      onChange: onChangeFileHandler,
                    })}
                  />
                  {errors?.profile_pic && (
                    <FormHelperText error id="email-error">
                      {errors?.profile_pic?.message}
                    </FormHelperText>
                  )}
                </Grid>
                {imageSrc && (
                  <Grid item xs={12} sm={3}>
                    <Avatar
                      alt="Profile Pic"
                      src={imageSrc}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "20%" }}
                    aria-label="login button"
                    disabled={isSubmitted}
                  >
                    {submitBtnTxt}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: 2, width: "20%" }}
                    aria-label="login button"
                    onClick={() => navigate("/cards")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

CardForm.defaultProps = {
  handleSubmit: () => {},
  onSubmitHandler: () => {},
  register: {},
  errors: {},
  severity: "",
  message: "",
  isSubmitted: false,
  title: "",
  submitBtnTxt: "",
  issue_date: "",
  expiry_date: "",
  onChangeFileHandler: () => {},
  imageSrc: "",
};

export default CardForm;
