import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Helmet } from "react-helmet";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const params = useParams();
  let token = "";
  if (params && params.token) {
    token = params.token;
  }
  const navigateTo = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const items = {
      password: data.get("password"),
      passwordConfirm: data.get("confirm_password"),
    };

    // console.log(items);
    // return false;

    let result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}users/resetPassword/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
      }
    );

    result = await result.json();

    if (result.status === "fail") {
      //   alert(result.status);
      setOpen(true);
      setStatusType("error");
      setErrorMessage(result.message);
      //   navigateTo("/login");
    } else if (result.status === "success") {
      //   alert(result.status);
      setStatusType("success");
      setOpen(true);
      setErrorMessage("Password updated successfully.");
    }
    //localStorage.setItem("user-info", JSON.stringify(result.data.user));
    //navigateTo("/");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const styles = {
    heading: {
      fontSize: 20,
    },
    subheading: {
      fontSize: 14,
    },
  };
  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <CssBaseline />

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ width: "25%" }}
        >
          <Alert
            onClose={handleClose}
            severity={statusType}
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={styles.heading} component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="off"
            autoFocus
            style={styles.heading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            type="password"
            autoComplete="off"
            autoFocus
            style={styles.heading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={styles.heading}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
