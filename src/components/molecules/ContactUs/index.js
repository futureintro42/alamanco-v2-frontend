import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  Paper,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { CONTACT_US } from "../../../constants/Mutation";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = useState({});
  const [createContact, { loading, error, data }] =
    useMutation(CONTACT_US);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Email is invalid";
    if (!formData.mobile.trim()) errs.mobile = "Mobile number is required";
    else if (!/^\d{10,15}$/.test(formData.mobile))
      errs.mobile = "Mobile number is invalid";
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createContact({ variables: { input: formData } });
    setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
  };

  // Response: Form submit handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createContact;
      setSeverity(response.severity);
      setMessage(response.message);
      if (!response.error && response.severity.includes("success")) {
        setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      }
    }
  }, [loading, error, data]);

  return (
    <Box sx={{ bgcolor: "#f9f9f9" }}>
      {/* Section Heading */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" fontWeight="bold" color="#1f4074" gutterBottom>
          Connect with Us
        </Typography>
        <Box
          sx={{
            width: "80px",
            height: "4px",
            bgcolor: "#1f4074",
            mx: "auto",
            borderRadius: "2px",
          }}
        />
        <Typography variant="body1" color="text.secondary" mt={2}>
          Have questions or need assistance? Fill out the form or reach us
          through the details below.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Form */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: "white" }}
          >
            {severity && message && (
              <Alert
                variant="standard"
                severity={severity}
                sx={{ width: "100%", mt: 1 }}
              >
                {message}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  fullWidth
                />
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  error={!!errors.subject}
                  helperText={errors.subject}
                  fullWidth
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  error={!!errors.message}
                  helperText={errors.message}
                  fullWidth
                  multiline
                  rows={4}
                />
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: "25px",
                      px: 5,
                      py: 1.5,
                      textTransform: "none",
                      background: "#1f4074",
                      "&:hover": {
                        background: "#16325c",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Details */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Paper
              elevation={2}
              sx={{ p: 3, display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <LocationOn sx={{ color: "#1f4074", fontSize: 30 }} />
              <Typography variant="body1">
                Kingdom of Saudi Arabia, Jeddah, Prince Fawaz District,
                Al-Mundhir Bin Al-Harith Street
              </Typography>
            </Paper>

            <Paper
              elevation={2}
              sx={{ p: 3, display: "flex", gap: 2, alignItems: "center" }}
            >
              <Phone sx={{ color: "#1f4074", fontSize: 28 }} />
              <Typography variant="body1">
                0508001034 / 0508001094
              </Typography>
            </Paper>

            <Paper
              elevation={2}
              sx={{ p: 3, display: "flex", gap: 2, alignItems: "center" }}
            >
              <Email sx={{ color: "#1f4074", fontSize: 28 }} />
              <Typography variant="body1">info@alamancom.com</Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
                sx={{ color: "#1f4074" }}
              >
                Working Hours
              </Typography>
              <Typography variant="body2">
                Sat – Thu: 9:00 AM – 6:00 PM
              </Typography>
              <Typography variant="body2">
                Friday & public holidays: Closed
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      {/* Embedded Google Map */}
      <Box mt={6}>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.613269061221!2d39.28377757627873!3d21.444440680310873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cc8ef2d34ef3%3A0xa8cb673898c301ac!2sPrince%20Fawaz%20garden!5e0!3m2!1sen!2sin!4v1758450319053!5m2!1sen!2sin"
          width="100%"
          height={{ xs: "300px", md: "450px" }}
          sx={{ border: 0, borderRadius: 2 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  );
};

export default ContactUs;
