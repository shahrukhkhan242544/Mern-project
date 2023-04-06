import * as React from "react";

import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast(props) {
  const [open, setOpen] = React.useState(false);

  console.log("open", open);
  setOpen(props.open);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
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
            {props.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default Toast;
