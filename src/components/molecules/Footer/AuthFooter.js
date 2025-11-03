import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/#">
        SAFETY International Company For Inspection
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AuthFooter() {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bottom:0,
          position: 'fixed',
          width: '100%'
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Copyright />
              </Grid>
              <Grid item xs={12}>
                  <Typography sx={{ fontSize: ".75rem" }}>
                    Web:{" "}
                    <Link href="https://alamancom.com/">
                      alamancom.com
                    </Link>
                  </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}