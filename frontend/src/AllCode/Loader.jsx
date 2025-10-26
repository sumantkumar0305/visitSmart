import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(255, 255, 255, 0.6)" // semi-transparent overlay
      zIndex={10} // ensure it appears above other content
      sx={{
        '&:hover':{
            cursor: 'pointer'
        }
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="h6" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
