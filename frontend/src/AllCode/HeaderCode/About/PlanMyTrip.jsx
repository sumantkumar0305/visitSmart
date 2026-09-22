import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Stack,
  Divider,
  Alert,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';

const brandColors = {
  primary: '#0d47a1',
  primaryDark: '#082e6b',
  accent: '#ffca28',
  bgSoft: '#f4f7fd',
  textDark: '#1c1c1c',
  textLight: '#666666'
};

const destinations = [
  'Rajasthan Heritage Tour',
  'Varanasi Spiritual Circuit',
  'Kerala Backwaters Escape',
  'Golden Triangle (Delhi, Agra, Jaipur)',
  'Himalayan Trekking Trail',
  'Goa Beaches & Coast',
  'Not sure yet — suggest something'
];

const interestOptions = [
  'Heritage & Monuments',
  'Spiritual & Pilgrimage',
  'Nature & Wildlife',
  'Adventure & Trekking',
  'Food & Culture',
  'Beaches & Relaxation',
  'Photography'
];

const budgetOptions = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+'
];

const travelerOptions = ['Solo', '2 Travelers', '3–5 Travelers', '6+ Travelers (Group)'];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: '',
  budget: '',
  interests: [],
  notes: ''
};

const PlanMyTrip = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.destination) next.destination = 'Pick a destination or "Not sure yet".';
    if (!form.startDate) next.startDate = 'Choose a start date.';
    if (!form.endDate) next.endDate = 'Choose an end date.';
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      next.endDate = 'End date must be after the start date.';
    }
    if (!form.travelers) next.travelers = 'Let us know your group size.';
    if (!form.budget) next.budget = 'Select an approximate budget.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Replace this URL with your real backend endpoint (Node/Express, Firebase
      // function, Formspree, EmailJS, a CRM webhook, etc.)
      const response = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Request failed. Please try again.');
      }

      setSubmitted(true);
      setForm(initialForm);

      // Give the user a moment to see the success alert, then take them to a
      // dedicated confirmation page. Remove this if you'd rather stay in place.
      setTimeout(() => {
        navigate('/thank-you');
      }, 1200);
    } catch (err) {
      setSubmitError(
        err.message || 'Something went wrong while sending your request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff', pb: 8 }}>

      {/* ================= HERO ================= */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.primaryDark} 100%)`,
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Chip
            label="LET'S BUILD YOUR TRIP"
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: brandColors.accent,
              fontWeight: 700,
              letterSpacing: 1.5,
              mb: 2,
              border: `1px solid ${brandColors.accent}`
            }}
          />
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.75rem' } }}>
            Plan My Trip
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 640, mx: 'auto', opacity: 0.9, fontWeight: 400 }}>
            Tell us a little about what you're dreaming of, and our team will craft an itinerary
            that fits your time, budget, and interests.
          </Typography>
        </Container>
      </Box>

      {/* ================= FORM ================= */}
      <Container maxWidth="md" sx={{ mt: { xs: -4, md: -6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid #e6ebf5',
            boxShadow: '0 20px 50px rgba(13,71,161,0.12)',
            bgcolor: '#fff'
          }}
        >
          {submitted && (
            <Alert
              icon={<CheckCircleIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 4, borderRadius: 2 }}
            >
              Thanks! Your trip request has been received — redirecting you now...
            </Alert>
          )}

          {submitError && (
            <Alert
              icon={<ErrorOutlineIcon fontSize="inherit" />}
              severity="error"
              sx={{ mb: 4, borderRadius: 2 }}
              onClose={() => setSubmitError('')}
            >
              {submitError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Contact details */}
            <Typography variant="overline" sx={{ color: brandColors.accent, fontWeight: 700, letterSpacing: 1.5 }}>
              Your Details
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: brandColors.primary, mb: 3 }}>
              Who are we planning for?
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={form.name}
                  onChange={handleChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={form.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number (optional)"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Trip details */}
            <Typography variant="overline" sx={{ color: brandColors.accent, fontWeight: 700, letterSpacing: 1.5 }}>
              Trip Details
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: brandColors.primary, mb: 3 }}>
              Where and when do you want to go?
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Destination"
                  value={form.destination}
                  onChange={handleChange('destination')}
                  error={!!errors.destination}
                  helperText={errors.destination}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PlaceIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                >
                  {destinations.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Number of Travelers"
                  value={form.travelers}
                  onChange={handleChange('travelers')}
                  error={!!errors.travelers}
                  helperText={errors.travelers}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                >
                  {travelerOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  value={form.startDate}
                  onChange={handleChange('startDate')}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  value={form.endDate}
                  onChange={handleChange('endDate')}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Approximate Budget (per person)"
                  value={form.budget}
                  onChange={handleChange('budget')}
                  error={!!errors.budget}
                  helperText={errors.budget}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon sx={{ color: brandColors.textLight }} />
                      </InputAdornment>
                    )
                  }}
                >
                  {budgetOptions.map((b) => (
                    <MenuItem key={b} value={b}>
                      {b}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Interests */}
            <Typography variant="overline" sx={{ color: brandColors.accent, fontWeight: 700, letterSpacing: 1.5 }}>
              Preferences
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: brandColors.primary, mb: 2 }}>
              What are you most excited about?
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 4 }}>
              {interestOptions.map((interest) => {
                const active = form.interests.includes(interest);
                return (
                  <Chip
                    key={interest}
                    label={interest}
                    onClick={() => toggleInterest(interest)}
                    sx={{
                      px: 1,
                      py: 2.2,
                      fontWeight: 600,
                      cursor: 'pointer',
                      bgcolor: active ? brandColors.primary : brandColors.bgSoft,
                      color: active ? '#fff' : brandColors.textDark,
                      border: `1px solid ${active ? brandColors.primary : '#dde4f2'}`,
                      '&:hover': {
                        bgcolor: active ? brandColors.primaryDark : '#e9eefb'
                      }
                    }}
                  />
                );
              })}
            </Stack>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Anything else we should know? (optional)"
              placeholder="Special occasions, accessibility needs, must-see places, dietary preferences..."
              value={form.notes}
              onChange={handleChange('notes')}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              endIcon={isSubmitting ? null : <SendIcon />}
              sx={{
                bgcolor: brandColors.accent,
                color: brandColors.primary,
                fontWeight: 'bold',
                px: 5,
                py: 1.4,
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { bgcolor: '#e6b624' },
                '&.Mui-disabled': { bgcolor: '#f0dca3', color: brandColors.primaryDark }
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ color: brandColors.primary, mr: 1.5 }} />
                  Sending...
                </>
              ) : (
                'Submit Trip Request'
              )}
            </Button>

            <Typography variant="caption" display="block" sx={{ color: brandColors.textLight, mt: 2 }}>
              No payment required. A travel specialist will follow up with a custom itinerary and quote.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PlanMyTrip;