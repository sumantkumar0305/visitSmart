import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper
} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import MapIcon from '@mui/icons-material/Map';

const brandColors = {
  primary: '#0d47a1',
  accent: '#ffca28',
  textDark: '#333333',
  textLight: '#666666'
};

const About = () => {
  return (
    <Box sx={{ bgcolor: '#fff', pb: 8 }}>

      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          height: { xs: 300, md: 450 },
          position: 'relative',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(13, 71, 161, 0.6)',
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Explore the Incredible India
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
            Visits Mart helps you discover India’s rich heritage, spiritual depth, and breathtaking destinations — from north to south.
          </Typography>
        </Container>
      </Box>

      {/* ================= MISSION SECTION ================= */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{ color: brandColors.accent, fontWeight: 'bold', letterSpacing: 1.5 }}
            >
              Who We Are
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: brandColors.primary, mb: 3 }}
            >
              Connecting You to the Soul of India
            </Typography>

            <Typography sx={{ color: brandColors.textLight, mb: 2, lineHeight: 1.8 }}>
              Visits Mart is a travel platform dedicated to showcasing the true essence of India.
              From the architectural wonders of the <b>Taj Mahal</b>, the spiritual ghats of
              <b> Varanasi</b>, the royal palaces of <b>Rajasthan</b>, to the serene backwaters of
              <b> Kerala</b>, India offers a journey like no other.
            </Typography>

            <Typography sx={{ color: brandColors.textLight, mb: 4, lineHeight: 1.8 }}>
              Our mission is to make travel across India easy, authentic, and memorable.
              We curate experiences that celebrate history, spirituality, culture, and natural beauty —
              guided by locals who know their land best.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: brandColors.accent,
                color: brandColors.primary,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#e6b624' }
              }}
            >
              Explore Destinations Across India
            </Button>
          </Grid>

          {/* IMAGE */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800"
              alt="Indian heritage"
              sx={{
                width: '100%',
                height: { xs: 300, md: 500 },
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ================= FEATURES SECTION ================= */}
      <Box sx={{ bgcolor: '#f4f7fd', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ color: brandColors.primary, mb: 6 }}
          >
            Why Travel India with Visits Mart?
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <HistoryEduIcon sx={{ fontSize: 60, color: brandColors.primary, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Rich Heritage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover India’s ancient civilizations, forts, temples, monuments, and UNESCO heritage sites.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <TempleHinduIcon sx={{ fontSize: 60, color: brandColors.primary, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Spiritual Experiences
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Walk sacred paths across Hindu, Buddhist, Jain, Sikh, and Sufi pilgrimage destinations.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <MapIcon sx={{ fontSize: 60, color: brandColors.primary, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Trusted Local Guides
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our India-wide network of local guides ensures safe, seamless, and culturally rich journeys.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default About;
