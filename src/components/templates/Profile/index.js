import { Grid } from '@mui/material';

import ProfileDetails from '../../molecules/ProfileDetails';

// ================================|| LOGIN ||================================ //

const Profile = () => {
  return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileDetails />
        </Grid>
      </Grid>
  );
};

export default Profile;
