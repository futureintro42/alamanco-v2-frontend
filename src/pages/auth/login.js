// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

import AuthLayout from '../../layout/AuthLayout';
import LoginForms from '../../components/molecules/LoginForm';

// ================================|| LOGIN ||================================ //

const Login = () => {
  console.log('Login call');
  return (
    <AuthLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LoginForms />
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default Login;
