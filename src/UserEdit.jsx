import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
const API = `${import.meta.env.VITE_API_BASE_URL}users/`;

const UserEdit = () => {
  const [exampleState, setExampleState] = useState(null);

  const navigateTo = useNavigate();
  const [user, setUser] = useState([]);
  const [name, setName] = useState();

  const params = useParams();
  const userId = params.id;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const items = {
      name: data.get("name"),
      // email: data.get("email"),
    };

    // console.log(items);
    // return false;

    let result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}users/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    result = await result.json();
    if (result) {
      alert("User updated successfully");
      navigateTo("/users");
    }
  };

  const fetchUser = async (url) => {
    try {
      const result = await fetch(url + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2U3MjIyNGUwNzBhMGI3MjY5YmI0OSIsImlhdCI6MTY4MTgxNDA1MCwiZXhwIjoxNjg5NTkwMDUwfQ.vw3B6H9IXoAeyOSFd50OIRAD4Kh0DZM5btvJCXpLMMQ",
          Accept: "application/json",
        },
      });

      const data = await result.json();

      if (data.status === "success") {
        // console.log("sss  ", data.data.data.photo);
        setUser(data.data.data);
        setName(data.data.data.name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser(API);
  }, []);

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
          <Helmet>
            <title>Edit User</title>
          </Helmet>
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Edit Page</Typography>
            </div>
            <div>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar
                            src={`${import.meta.env.VITE_BASE_URL}/user/${
                              user.photo
                            }`}
                            sx={{
                              height: 80,
                              mb: 2,
                              width: 80,
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <Card>
                      <CardHeader title={`Edit User ${user.name}`} />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid container spacing={3}>
                            <Grid xs={12} md={6}>
                              {/* <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                id="name"
                                value={`${user.name}`}
                              /> */}

                              {/* <TextField
                                fullWidth
                                id="outlined-required"
                                label="Name"
                                name="name"
                                defaultValue={`${name} shahrukh`}
                              /> */}

                              <input
                                id="outlined-required"
                                placeholder="Name"
                                name="name"
                                type="text"
                                defaultValue={name}
                              />
                            </Grid>

                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Email"
                                value={`${user.email}`}
                                name="email"
                                id="email"
                                disabled={true}
                              />
                            </Grid>

                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Role"
                                value={`${user.role}`}
                                disabled={true}
                              />
                            </Grid>

                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                id="demo-helper-text-aligned"
                                type="file"
                                name="photo"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" type="submit">
                          Update
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
//   const { state, dispatch } = useContext(UserContext);

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UserEdit;
