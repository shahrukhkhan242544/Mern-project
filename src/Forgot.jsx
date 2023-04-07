import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

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

export default function Forgot() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigateTo = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const items = {
      email: data.get("email"),
    };
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    let result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}users/forgotPassword`,
      {
        method: "post",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    result = await result.json();
    if (result) {
      setOpen(true);
      setErrorMessage(result.message);
      //return false;
      //localStorage.setItem("user-info", JSON.stringify(result.data.user));
      //navigateTo("/");
    }
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
      <CssBaseline />
      <Helmet>
        <title>Forgot</title>
      </Helmet>

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
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
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
          Forgot
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
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
