import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';

const brandColors = {
  primary: '#0d47a1',
  primaryDark: '#082e6b',
  accent: '#ffca28',
  textLight: '#666666'
};

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f4f7fd',
        py: 10
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 90, color: brandColors.primary, mb: 3 }} />
        <Typography variant="h4" fontWeight={800} sx={{ color: brandColors.primary, mb: 2 }}>
          Your Trip Request Is In!
        </Typography>
        <Typography sx={{ color: brandColors.textLight, mb: 5, lineHeight: 1.8 }}>
          Thank you for trusting Visits Mart with your journey. One of our travel specialists
          will review your preferences and reach out by email or phone within 24 hours with a
          custom itinerary and quote.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              bgcolor: brandColors.primary,
              fontWeight: 'bold',
              px: 4,
              py: 1.2,
              '&:hover': { bgcolor: brandColors.primaryDark }
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<MapIcon />}
            onClick={() => navigate('/about')}
            sx={{
              borderColor: brandColors.primary,
              color: brandColors.primary,
              fontWeight: 'bold',
              px: 4,
              py: 1.2,
              '&:hover': { borderColor: brandColors.primaryDark, bgcolor: 'rgba(13,71,161,0.05)' }
            }}
          >
            Explore Destinations
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ThankYou;