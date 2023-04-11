import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./App";

import { AccountProfile } from "./components/Account-Profile";
import { AccountProfileDetails } from "./components/account-profile-details";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);

  let name = "";
  let userId = "";
  let email = "";
  let photo = "";
  if (state) {
    name = state.name;
    email = state.email;
    userId = state._id;
    photo = state.photo;
  } else {
    let userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      name = userInfo.name;
      photo = userInfo.photo;
      email = userInfo.email;
      userId = userInfo._id;
    }
  }

  const UserDetail = {
    userId,
    name,
    email,
    photo,
  };

  //   console.log(UserDetail);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile UserDetail={UserDetail} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails UserDetail={UserDetail} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
//   const { state, dispatch } = useContext(UserContext);

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profile;
