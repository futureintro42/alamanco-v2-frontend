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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const InvoiceForm = ({
  handleSubmit,
  onSubmitHandler,
  register,
  errors,
  severity,
  message,
  isSubmitted,
  title,
  submitBtnTxt,
  insDate,
  insNextDate,
  resultStatusDefaultValue,
}) => {
  const navigate = useNavigate();
  return (
    <Container sx={{ mb: 10, p: 0 }}>
      <Card sx={{ borderColor: "primary.dark" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
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
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    Certificate of testing and comprehensive inspection of the
                    equipment
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="sticker_number"
                    required
                    fullWidth
                    id="sticker_number"
                    label="Sticker Number"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("sticker_number")}
                  />
                  {errors?.sticker_number && (
                    <FormHelperText error id="email-error">
                      {errors?.sticker_number?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="reference_number"
                    required
                    fullWidth
                    id="reference_number"
                    label="Reference Number"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("reference_number")}
                  />
                  {errors?.reference_number && (
                    <FormHelperText error id="email-error">
                      {errors?.reference_number?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    Description of the Equipment
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="equipment_type"
                    required
                    fullWidth
                    id="equipment_type"
                    label="Equipment Type"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("equipment_type")}
                  />
                  {errors?.equipment_type && (
                    <FormHelperText error id="email-error">
                      {errors?.equipment_type?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="equipment_description"
                    required
                    fullWidth
                    id="equipment_description"
                    label="Equipment Description"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("equipment_description")}
                  />
                  {errors?.equipment_description && (
                    <FormHelperText error id="email-error">
                      {errors?.equipment_description?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="make"
                    required
                    fullWidth
                    id="make"
                    label="Make"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("make")}
                  />
                  {errors?.make && (
                    <FormHelperText error id="email-error">
                      {errors?.make?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="serial_number"
                    required
                    fullWidth
                    id="serial_number"
                    label="Serial Number"
                    autoFocus
                    error={!!errors?.serial_number?.message}
                    {...register("serial_number")}
                  />
                  {errors?.serial_number && (
                    <FormHelperText error id="email-error">
                      {errors?.serial_number?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="year_of_manufacturing"
                    required
                    fullWidth
                    id="year_of_manufacturing"
                    label="Year of manufacturing"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("year_of_manufacturing")}
                  />
                  {errors?.year_of_manufacturing && (
                    <FormHelperText error id="email-error">
                      {errors?.year_of_manufacturing?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="plant_number"
                    required
                    fullWidth
                    id="plant_number"
                    label="Plant Number"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("plant_number")}
                  />
                  {errors?.plant_number && (
                    <FormHelperText error id="email-error">
                      {errors?.plant_number?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="location_of_equipment"
                    required
                    fullWidth
                    id="location_of_equipment"
                    label="Location of the equipment"
                    autoFocus
                    error={!!errors?.sticker_number?.message}
                    {...register("location_of_equipment")}
                  />
                  {errors?.location_of_equipment && (
                    <FormHelperText error id="email-error">
                      {errors?.location_of_equipment?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="owner_business_name"
                    required
                    fullWidth
                    id="owner_business_name"
                    label="Owner's Business name"
                    autoFocus
                    error={!!errors?.owner_business_name?.message}
                    {...register("owner_business_name")}
                  />
                  {errors?.owner_business_name && (
                    <FormHelperText error id="email-error">
                      {errors?.owner_business_name?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="owner_business_address"
                    required
                    fullWidth
                    id="owner_business_address"
                    label="Owner's Business address"
                    autoFocus
                    error={!!errors?.owner_business_address?.message}
                    {...register("owner_business_address")}
                  />
                  {errors?.owner_business_address && (
                    <FormHelperText error id="email-error">
                      {errors?.owner_business_address?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="details"
                    required
                    fullWidth
                    id="details"
                    label="Details of any defects or comments"
                    autoFocus
                    error={!!errors?.details?.message}
                    {...register("details")}
                  />
                  {errors?.details && (
                    <FormHelperText error id="email-error">
                      {errors?.details?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="standard_specification"
                    required
                    fullWidth
                    id="standard_specification"
                    label="National Standard or technical specification used"
                    autoFocus
                    error={!!errors?.standard_specification?.message}
                    {...register("standard_specification")}
                  />
                  {errors?.standard_specification && (
                    <FormHelperText error id="email-error">
                      {errors?.standard_specification?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    Visual inspection and functional tests were satisfactory
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="business_name"
                    required
                    fullWidth
                    id="business_name"
                    label="Business name"
                    autoFocus
                    error={!!errors?.business_name?.message}
                    {...register("business_name")}
                  />
                  {errors?.business_name && (
                    <FormHelperText error id="email-error">
                      {errors?.business_name?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="business_address"
                    required
                    fullWidth
                    id="business_address"
                    label="Business address"
                    autoFocus
                    error={!!errors?.business_address?.message}
                    {...register("business_address")}
                  />
                  {errors?.business_address && (
                    <FormHelperText error id="email-error">
                      {errors?.business_address?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel shrink>Inspection date</InputLabel>
                  <TextField
                    type="date"
                    autoComplete="given-name"
                    name="inspection_date"
                    required
                    fullWidth
                    id="inspection_date"
                    autoFocus
                    defaultValue={insDate}
                    error={!!errors?.inspection_date?.message}
                    {...register("inspection_date")}
                  />
                  {errors?.inspection_date && (
                    <FormHelperText error id="email-error">
                      {errors?.inspection_date?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel shrink>Inspection next date</InputLabel>
                  <TextField
                    type="date"
                    autoComplete="given-name"
                    name="inspection_next_date"
                    required
                    fullWidth
                    id="inspection_next_date"
                    autoFocus
                    defaultValue={insNextDate}
                    error={!!errors?.inspection_next_date?.message}
                    {...register("inspection_next_date")}
                  />
                  {errors?.inspection_next_date && (
                    <FormHelperText error id="email-error">
                      {errors?.inspection_next_date?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="inspector_name"
                    required
                    fullWidth
                    id="inspector_name"
                    label="Inspector's Name"
                    autoFocus
                    error={!!errors?.inspector_name?.message}
                    {...register("inspector_name")}
                  />
                  {errors?.inspector_name && (
                    <FormHelperText error id="email-error">
                      {errors?.inspector_name?.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="resultStatus">Result Status</InputLabel>
                    <Select
                      labelId="resultStatus"
                      id="resultStatus"
                      label="Result Status"
                      defaultValue={resultStatusDefaultValue}
                      required
                      {...register("resultStatus")}
                      error={!!errors?.resultStatus?.message}
                    >
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Accepted">Accepted</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="Passed">Passed</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                    {errors?.resultStatus && (
                      <FormHelperText error id="email-error">
                        {errors?.resultStatus?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
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
                    type="button"
                    variant="contained"
                    sx={{ ml: 2, width: "20%" }}
                    aria-label="login button"
                    onClick={() => navigate("/certificate")}
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

InvoiceForm.defaultProps = {
  handleSubmit: () => {},
  onSubmitHandler: () => {},
  register: {},
  errors: {},
  severity: "",
  message: "",
  isSubmitted: false,
  title: "",
  submitBtnTxt: "",
  insDate: "",
  insNextDate: "",
  resultStatusDefaultValue: "",
};

export default InvoiceForm;
