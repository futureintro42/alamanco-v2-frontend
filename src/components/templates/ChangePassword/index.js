import { Grid } from '@mui/material';

import ChangePasswordForm from '../../molecules/ChangePasswordForm';

// ================================|| LOGIN ||================================ //

const ChangePassword = () => {
  return (
      <Grid container>
        <Grid item xs={12}>
          <ChangePasswordForm />
        </Grid>
      </Grid>
  );
};

export default ChangePassword;
