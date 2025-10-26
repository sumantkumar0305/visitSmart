import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactCode from './ContactCode';
import LinkCode from './LinkCode';
import IconCode from './IconCode';
import BottomCode from './BottomCode';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0d47a1',
        color: '#fff',
        mt: 8,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Janshayak
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 300 }}>
              Janshayak is dedicated to providing the best services for your needs. Our mission is to
              empower users with quality solutions and support.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <LinkCode link="#" text="Home" />
              <LinkCode link="#" text="About" />
              <LinkCode link="#" text="Services" />
              <LinkCode link="#" text="Contact" />
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <ContactCode label="Email" value="info@janshayak.com" />
            <ContactCode label="Phone" value="+123 456 7890" />
          </Grid>

          {/* Social */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconCode href="https://facebook.com" Icon={FacebookIcon} />
              <IconCode href="https://twitter.com" Icon={TwitterIcon} />
              <IconCode href="https://instagram.com" Icon={InstagramIcon} />
              <IconCode href="https://linkedin.com" Icon={LinkedInIcon} />

            </Box>
          </Grid>
        </Grid>

        {/* Bottom Text */}
        <BottomCode />
      </Container>
    </Box>
  );
};

export default Footer;
