import React, {useState} from 'react';
import { Alert, AlertTitle, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertMsg({ alert }) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
      {showAlert && (
        <Alert
          severity={alert.type}
          variant="filled"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {alert.type}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}
    </Stack>
  );
}


