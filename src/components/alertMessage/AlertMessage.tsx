import React from "react";
import {Alert, Box, Button, Collapse, IconButton,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


type AlertMessageProps = {
  severity: "warning" |"info" |"success" | "error";
  message: string;
  showAlert: boolean;
  setShowAlert: any;
}
const AlertMessage: React.FC<AlertMessageProps> = ({
                                                     severity="info",
                                                     message,
                                                     setShowAlert,
                                                     showAlert
                                                   }) => {
  // const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{width: "100%"}}>
      <Collapse in={showAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit"/>
            </IconButton>
          }
          sx={{mb: 2}}
        >
          {message}
        </Alert>
      </Collapse>

    </Box>
  );
};

export default AlertMessage;
