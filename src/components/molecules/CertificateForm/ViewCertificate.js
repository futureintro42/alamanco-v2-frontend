import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../utils/utils";

const StripedTableCell = styled(TableCell)(() => ({
  "&.MuiTableCell-root": {
    border: "1px solid black",
    width: "25%",
    padding: "3px 8px",
    fontWeight: "600",
  },
}));
const StripedCertificateTableCell = styled(TableCell)(() => ({
  "&.MuiTableCell-root": {
    border: "1px solid black",
    width: "15%",
    padding: "3px 8px",
    fontWeight: "600",
  },
}));

const ViewCertificate = ({ title, dataRow }) => {
  const ref = useRef();
  const {
    business_address,
    business_name,
    details,
    equipment_description,
    equipment_type,
    inspection_date,
    inspection_next_date,
    inspector_name,
    location_of_equipment,
    make,
    owner_business_address,
    owner_business_name,
    plant_number,
    reference_number,
    serial_number,
    standard_specification,
    sticker_number,
    resultStatus = "",
    year_of_manufacturing,
    id,
  } = dataRow || {};
  const descriptionRows = [
    {
      col: "EQUIPMENT TYIP",
      colValue: equipment_type,
      col1: "DESCRIPTION & IDENTIFICATION OF THE EQUIPMENT",
      col1Value: equipment_description,
    },
    {
      col: "MANUFACTURER",
      colValue: make,
      col1: "SERIAL NUMBER",
      col1Value: serial_number,
    },
    {
      col: "DATE OF MANUFACTURE EQUIPMENT",
      colValue: year_of_manufacturing,
      col1: "REGISTRATION PLAT NUMBER",
      col1Value: plant_number,
    },
    {
      col: "LOCATION OF THE EQUIPMENT",
      colValue: location_of_equipment,
      col1: "",
      col1Value: "",
    },
    {
      col: "OWNER’S BUSINESS NAME",
      colValue: owner_business_name,
      col1: "OWNER’S BUSINESS ADDRESS",
      col1Value: owner_business_address,
    },
    {
      col: "DETAILS OF ANY DEFECTS OR COMMENTS",
      colValue: details,
      col1: "WAS IT INSTALLED CORRECTLY LOAD CHART IN CAB",
      col1Value: standard_specification,
    },
  ];
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: { xs: 0 },
      }}
    >
      <Card sx={{ mb: 4, width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <RouterLink to="/certificate/search" style={{ textDecoration: "none", color: "#3366FF", alignContent: "center", paddingLeft: "20px" }}>Search certificate</RouterLink>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => <Button type="primary">Print</Button>}
          />
        </Box>
      </Card>
      <Card sx={{ width: "100%" }} ref={ref}>
        <CardContent sx={{ mt: 12 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: "center", textTransform: "uppercase" }}
              >
                Certificate of testing and comprehensive inspection of the
                equipment
              </Typography>
              <TableContainer>
                <Table aria-label="certificate">
                  <TableBody>
                    <TableRow>
                      <StripedCertificateTableCell
                        padding="normal"
                        size="small"
                      >
                        CERTIFICATE NUMBER
                      </StripedCertificateTableCell>
                      <StripedCertificateTableCell
                        padding="normal"
                        size="small"
                        sx={{ color: "red" }}
                      >
                        {id}
                      </StripedCertificateTableCell>
                      <StripedCertificateTableCell
                        padding="normal"
                        size="small"
                      >
                        STICKER NUMBER
                      </StripedCertificateTableCell>
                      <StripedCertificateTableCell
                        padding="normal"
                        size="small"
                        sx={{ color: "red" }}
                      >
                        {sticker_number}
                      </StripedCertificateTableCell>
                      <StripedCertificateTableCell
                        padding="normal"
                        size="small"
                      >
                        REFERENCE NUMBER
                      </StripedCertificateTableCell>
                      <StripedCertificateTableCell
                        sx={{ width: "15%", color: "red" }}
                        padding="normal"
                        size="small"
                      >
                        {reference_number}
                      </StripedCertificateTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: "center" }}
              >
                DESCRIPTION OF THE EQUIPMENT
              </Typography>
              <TableContainer>
                <Table aria-label="equipment-description">
                  <TableBody>
                    {descriptionRows.map((row) => (
                      <TableRow key={`${row.col}_${row.colValue}`}>
                        <StripedTableCell
                          padding="normal"
                          size="small"
                          sx={{ width: "25%" }}
                        >
                          {row.col}
                        </StripedTableCell>
                        <StripedTableCell
                          sx={{ width: "25%" }}
                          padding="normal"
                          size="small"
                        >
                          {row.colValue}
                        </StripedTableCell>
                        <StripedTableCell
                          padding="normal"
                          size="small"
                          sx={{ width: "25%" }}
                        >
                          {row.col1}
                        </StripedTableCell>
                        <StripedTableCell
                          sx={{ width: "25%" }}
                          padding="normal"
                          size="small"
                        >
                          {row.col1Value}
                        </StripedTableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "100%" }}
                        colSpan={4}
                      >
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{ textAlign: "center" }}
                        >
                          VISUAL INSPECTION AND FUNCTIONAL TESTS WERE
                          SATISFACTORY FINAL RESULT -{" "}
                          {resultStatus?.toUpperCase()}
                        </Typography>
                      </StripedTableCell>
                    </TableRow>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "30%" }}
                      >
                        BUSINESS NAME
                      </StripedTableCell>
                      <StripedTableCell
                        sx={{ width: "30%" }}
                        padding="normal"
                        size="small"
                      >
                        {business_name}
                      </StripedTableCell>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "30%" }}
                      >
                        BUSINESS ADDRESS
                      </StripedTableCell>
                      <StripedTableCell
                        sx={{ width: "30%" }}
                        padding="normal"
                        size="small"
                      >
                        {business_address}
                      </StripedTableCell>
                    </TableRow>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "30%" }}
                      >
                        DATE OF INSPECTION
                      </StripedTableCell>
                      <StripedTableCell
                        sx={{ width: "30%" }}
                        padding="normal"
                        size="small"
                      >
                        {formatDate(inspection_date)}
                      </StripedTableCell>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "30%" }}
                      >
                        DATE OF NEXT INSPECTION
                      </StripedTableCell>
                      <StripedTableCell
                        sx={{ width: "30%" }}
                        padding="normal"
                        size="small"
                      >
                        {formatDate(inspection_next_date)}
                      </StripedTableCell>
                    </TableRow>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        colSpan={4}
                      >
                        <Typography variant="h5" component="h5">
                          DECLARATTION:
                        </Typography>
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          I HEREBY DECLARE THAT THE ABOVE INFORMATION IS CORRECT
                          AND THAT THE EQUIPMENT HAS BEEN TESTED AND THOROUGHLY
                          EXAMINED IN ACCORDANCE WITH THE APPROPRIATE
                          PROVISIONS/STANDARDS AT THE TIME OF INSPECTION AND
                          FOUND TO BE FREE FROM ANY DEFECT SAFETY OTHER THAN
                          THESE DETAILED ABOVE
                        </Typography>
                      </StripedTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table aria-label="certificate">
                  <TableBody>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        colSpan={2}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{ textDecoration: "underline" }}
                          >
                            Disclaimer
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              ml: 1,
                              fontWeight: "600",
                              textTransform: "uppercase",
                            }}
                          >
                            : THIS CERTIFICATE IS ISSUED SUBJECT TO THE
                            OBSERVATION MADE AT THE TIME OF OUR INSPECTION. THE
                            INSPECTION COMPANY WILL NOT BE HELD LIABLE FOR ANY
                            DAMAGES OR LOSSES OCCASIONED TO THE EQUIPMENT
                            SUBSEQUENT TO THE INSPECTION.
                          </Typography>
                        </Box>
                      </StripedTableCell>
                    </TableRow>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        sx={{ width: "30%" }}
                      >
                        INSPECTOR’S NAME
                      </StripedTableCell>
                      <StripedTableCell padding="normal" size="small">
                        {inspector_name}
                      </StripedTableCell>
                    </TableRow>
                    <TableRow>
                      <StripedTableCell
                        padding="normal"
                        size="small"
                        colSpan={2}
                      >
                        <Grid container spacing={0.1}>
                          <Grid item xs={6} sx={{ mt: 0.2 }}>
                            <QRCode
                              size={280}
                              style={{ height: "60px", width: "100px" }}
                              value={`${window.location.origin}/certificate/search`}
                              viewBox={`0 0 280 280`}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 0.2,
                            }}
                          >
                            <Typography sx={{ fontWeight: "600" }}>
                              Technical Director
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              To verify the authenticity of the certificate
                              data, please scan the QR code
                            </Typography>
                          </Grid>
                        </Grid>
                      </StripedTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

ViewCertificate.defaultProps = {
  title: "",
  dataRow: {},
};

export default ViewCertificate;
