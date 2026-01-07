import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactCode from './ContactCode';
import LinkCode from './LinkCode';
import IconCode from './IconCode';
import BottomCode from './BottomCode';

const Footer = () => {
  // Brand colors extracted from your header image
  const brandColors = {
    primary: '#0d47a1', // Deep Blue
    accent: '#ffca28',  // Yellow (matching your Sign Up button)
    text: '#ffffff'
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: brandColors.primary,
        color: brandColors.text,
        mt: 8,
        py: 6,
        borderTop: `4px solid ${brandColors.accent}` // Yellow top border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 1. Brand & About */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ fontWeight: '800', color: brandColors.accent, letterSpacing: 1 }}
            >
              Visits Mart
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 300, lineHeight: 1.8 }}>
              Explore the historical and spiritual wonders of Bihar. 
              We are dedicated to providing the best travel experiences and guidance for your journey.
            </Typography>
          </Grid>

          {/* 2. REPLACED SECTION: Quick Links / Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: brandColors.accent }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <LinkCode link="/" text="Home" />
              <LinkCode link="/about" text="About Us" />
              <LinkCode link="/login/form" text="Login" />
              <LinkCode link="https://www.freeprivacypolicy.com/privacy-policy/" text="Privacy Policy" />
            </Box>
          </Grid>

          {/* 3. Contact Info */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: brandColors.accent }}>
              Contact Us
            </Typography>
            <ContactCode label="Email" value="support@visitsmart.com" />
            <ContactCode label="Helpline" value="+91 98765 43210" />
            <ContactCode label="Office" value="Patna, Bihar, India" />
          </Grid>

          {/* 4. Social Media */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: brandColors.accent }}>
              Follow Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Connect with us for updates and offers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconCode href="https://facebook.com" Icon={FacebookIcon} />
              <IconCode href="https://twitter.com" Icon={TwitterIcon} />
              <IconCode href="https://instagram.com" Icon={InstagramIcon} />
              <IconCode href="https://linkedin.com" Icon={LinkedInIcon} />
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Copyright Section */}
        <BottomCode /> 
      </Container>
    </Box>
  );
};

export default Footer;