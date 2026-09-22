import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const brandColors = {
  primary: '#0d47a1',
  primaryDark: '#082e6b',
  accent: '#ffca28',
  bgSoft: '#f4f7fd',
  textDark: '#1c1c1c',
  textLight: '#666666'
};

const stats = [
  { label: 'Destinations Covered', value: '120+' },
  { label: 'Happy Travelers', value: '25,000+' },
  { label: 'Local Guides', value: '400+' },
  { label: 'Years of Experience', value: '8+' }
];

const values = [
  {
    icon: <Diversity3Icon sx={{ fontSize: 44, color: brandColors.primary }} />,
    title: 'Authentic Connection',
    desc: 'We partner with local communities so every trip supports the people who call these places home.'
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 44, color: brandColors.primary }} />,
    title: 'Safety First',
    desc: 'Vetted guides, transparent pricing, and 24/7 support so you can travel with total peace of mind.'
  },
  {
    icon: <PublicIcon sx={{ fontSize: 44, color: brandColors.primary }} />,
    title: 'Responsible Travel',
    desc: 'We champion low-impact, sustainable tourism that protects the heritage sites we love to share.'
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 44, color: brandColors.primary }} />,
    title: 'End-to-End Support',
    desc: 'From your first itinerary draft to the ride home from the airport, we\'re with you the whole way.'
  }
];

const testimonials = [
  {
    quote: 'Our Rajasthan trip felt handcrafted, not templated. The guide knew stories no guidebook had.',
    name: 'Meera K.',
    trip: 'Rajasthan Heritage Tour'
  },
  {
    quote: 'Varanasi at sunrise was life-changing. Visits Mart handled every detail so we could just be present.',
    name: 'Daniel R.',
    trip: 'Spiritual Ganges Circuit'
  },
  {
    quote: 'Kerala\'s backwaters, arranged in a day when our plans changed last minute. Incredible support.',
    name: 'Aiko T.',
    trip: 'Kerala Backwaters Escape'
  }
];

const contactInfo = [
  {
    icon: <EmailIcon sx={{ color: brandColors.primary }} />,
    label: 'Email',
    value: 'support@visitsmart-travel.com',
    href: 'mailto:support@visitsmart-travel.com'
  },
  {
    icon: <PhoneIcon sx={{ color: brandColors.primary }} />,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210'
  },
  {
    icon: <LinkedInIcon sx={{ color: brandColors.primary }} />,
    label: 'LinkedIn',
    value: 'linkedin.com/company/visits-mart',
    href: 'https://www.linkedin.com/in/sumant-kumar-dev/'
  },
  {
    icon: <InstagramIcon sx={{ color: brandColors.primary }} />,
    label: 'Instagram',
    value: '@visitsmart.travel',
    href: 'https://www.instagram.com/visitsmart.travel'
  },
  {
    icon: <LocationOnIcon sx={{ color: brandColors.primary }} />,
    label: 'Office',
    value: 'Patna, Bihar, India',
    href: 'https://maps.google.com/?q=DLF+Cyber+City+Gurugram'
  }
];

const About = () => {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: '#fff', pb: 8 }}>

      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          height: { xs: 340, md: 480 },
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
            background: `linear-gradient(180deg, rgba(13,71,161,0.75) 0%, rgba(8,46,107,0.85) 100%)`,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          <Chip
            label="ABOUT VISITS MART"
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: brandColors.accent,
              fontWeight: 700,
              letterSpacing: 1.5,
              mb: 2,
              border: `1px solid ${brandColors.accent}`
            }}
          />
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Explore the Incredible India
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', opacity: 0.9, fontWeight: 400 }}>
            Visits Mart helps you discover India's rich heritage, spiritual depth, and breathtaking
            destinations — from north to south.
          </Typography>
        </Container>
      </Box>

      {/* ================= STATS BAR ================= */}
      <Box sx={{ bgcolor: brandColors.primary, py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((s) => (
              <Grid item xs={6} md={3} key={s.label} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: brandColors.accent }}>
                  {s.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  {s.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= MISSION SECTION ================= */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
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
              From the architectural wonders of the <b>Taj Mahal</b>, the spiritual ghats of{' '}
              <b>Varanasi</b>, the royal palaces of <b>Rajasthan</b>, to the serene backwaters of{' '}
              <b>Kerala</b>, India offers a journey like no other.
            </Typography>

            <Typography sx={{ color: brandColors.textLight, mb: 2, lineHeight: 1.8 }}>
              Founded by a small group of travelers who kept getting asked "how did you plan that?",
              Visits Mart grew from personal itineraries shared with friends into a platform trusted
              by thousands of explorers every year.
            </Typography>

            <Typography sx={{ color: brandColors.textLight, mb: 4, lineHeight: 1.8 }}>
              Our mission is to make travel across India easy, authentic, and memorable.
              We curate experiences that celebrate history, spirituality, culture, and natural beauty —
              guided by locals who know their land best.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<EastIcon />}
              sx={{
                bgcolor: brandColors.accent,
                color: brandColors.primary,
                fontWeight: 'bold',
                px: 4,
                py: 1.2,
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
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ================= FEATURES SECTION ================= */}
      <Box sx={{ bgcolor: brandColors.bgSoft, py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            sx={{ color: brandColors.accent, fontWeight: 'bold', letterSpacing: 1.5, mb: 1 }}
          >
            What Sets Us Apart
          </Typography>
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
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e6ebf5',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(13,71,161,0.12)' }
                }}
              >
                <HistoryEduIcon sx={{ fontSize: 60, color: brandColors.primary, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Rich Heritage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover India's ancient civilizations, forts, temples, monuments, and UNESCO heritage sites.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e6ebf5',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(13,71,161,0.12)' }
                }}
              >
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
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e6ebf5',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(13,71,161,0.12)' }
                }}
              >
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

      {/* ================= VALUES SECTION ================= */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="overline"
          display="block"
          textAlign="center"
          sx={{ color: brandColors.accent, fontWeight: 'bold', letterSpacing: 1.5, mb: 1 }}
        >
          Our Values
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ color: brandColors.primary, mb: 6 }}
        >
          What We Stand For
        </Typography>

        <Grid container spacing={4}>
          {values.map((v) => (
            <Grid item xs={12} sm={6} md={3} key={v.title} sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>{v.icon}</Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: brandColors.textDark, mb: 1 }}>
                {v.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {v.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <Box sx={{ bgcolor: brandColors.primary, py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            sx={{ color: brandColors.accent, fontWeight: 'bold', letterSpacing: 1.5, mb: 1 }}
          >
            Traveler Stories
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ color: '#fff', mb: 6 }}
          >
            What Our Travelers Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((t) => (
              <Grid item xs={12} md={4} key={t.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: 36, color: brandColors.accent, mb: 1 }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                    {t.quote}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: brandColors.accent, color: brandColors.primary, fontWeight: 700 }}>
                      {t.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff' }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {t.trip}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= CTA SECTION ================= */}
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: brandColors.primary, mb: 2 }}>
          Ready to Start Your Indian Adventure?
        </Typography>
        <Typography sx={{ color: brandColors.textLight, mb: 4, maxWidth: 560, mx: 'auto' }}>
          Tell us where your curiosity is pointing, and we'll help you build a trip that feels
          personal from the very first stop.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/plan-my-trip')}
            sx={{
              bgcolor: brandColors.primary,
              fontWeight: 'bold',
              px: 4,
              py: 1.2,
              '&:hover': { bgcolor: brandColors.primaryDark }
            }}
          >
            Plan My Trip
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setContactOpen(true)}
            sx={{
              borderColor: brandColors.primary,
              color: brandColors.primary,
              fontWeight: 'bold',
              px: 4,
              py: 1.2,
              '&:hover': { borderColor: brandColors.primaryDark, bgcolor: 'rgba(13,71,161,0.05)' }
            }}
          >
            Contact Our Team
          </Button>
        </Stack>
      </Container>

      {/* ================= CONTACT DIALOG ================= */}
      <Dialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: brandColors.primary }}>
            Get in Touch
          </Typography>
          <IconButton onClick={() => setContactOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ color: brandColors.textLight, mb: 3 }}>
            Reach out to our travel team directly — we typically respond within a few hours.
          </Typography>
          <Stack spacing={2.5}>
            {contactInfo.map((c) => (
              <Stack
                key={c.label}
                direction="row"
                spacing={2}
                alignItems="center"
                component="a"
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{
                  textDecoration: 'none',
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid #e6ebf5',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: brandColors.bgSoft }
                }}
              >
                {c.icon}
                <Box>
                  <Typography variant="caption" sx={{ color: brandColors.textLight, display: 'block' }}>
                    {c.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ color: brandColors.textDark }}>
                    {c.value}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default About;