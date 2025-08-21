import { Grid } from '@mui/material';

import SignUpForms from '../../molecules/SignUpForms';

// ================================|| LOGIN ||================================ //

const SignUp = () => {
  return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SignUpForms />
        </Grid>
      </Grid>
  );
};

export default SignUp;
