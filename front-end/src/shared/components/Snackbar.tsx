import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type SnackbarProps = {
  messageType: 'error' | 'info' | 'success' | 'warning';
  message: string;
};

export function CustomSnackbar({
  messageType,
  message,
}: SnackbarProps) {
  const [openMessage, setOpenMessage] = useState(true);

  return (
    <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
        <Alert severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}
