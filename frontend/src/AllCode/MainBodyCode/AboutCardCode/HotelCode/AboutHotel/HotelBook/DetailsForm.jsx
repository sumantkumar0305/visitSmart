import { 
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Divider,
    Button,
} from "@mui/material";
import { Person as PersonIcon,
    CalendarMonth as CalendarIcon,
    CloudUpload as CloudUploadIcon,
    Badge as BadgeIcon } from "@mui/icons-material";

export default function DetailsForm({handleChange, countryCode, setCountryCode, fileName}){
    return (
        <Grid container spacing={3}>
            {/* --- Personal Info Section --- */}
            <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BadgeIcon color="action" /> Guest Information
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="phone"
                name="phone"
                label="Mobile Number"
                placeholder="9876543210"
                type="tel"
                fullWidth
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        variant="standard"
                        disableUnderline
                        sx={{ mr: 1, fontWeight: 'bold' }}
                      >
                        <MenuItem value="+91">🇮🇳 +91</MenuItem>
                        <MenuItem value="+1">🇺🇸 +1</MenuItem>
                        <MenuItem value="+44">🇬🇧 +44</MenuItem>
                      </Select>
                      <Divider orientation="vertical" flexItem />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            {/* --- Date Section --- */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Check-in Date"
                type="date"
                name="checkin"
                fullWidth
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><CalendarIcon color="primary"/></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Check-out Date"
                type="date"
                name="checkout"
                fullWidth
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><CalendarIcon color="error"/></InputAdornment>
                }}
              />
            </Grid>

            {/* --- ID Proof Upload --- */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">ID Proof Verification</Typography>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                  height: 60,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: 'success.main',
                  color: 'success.main',
                  bgcolor:  'grey.50',
                  "&:hover": {
                     borderStyle: 'dashed',
                     borderWidth: 2,
                     bgcolor: 'grey.100'
                  }
                }}
              >
                {fileName ? `Selected: ${fileName}` : "Click to Upload ID Proof (Image)"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="idProof"
                  onChange={handleChange}
                />
              </Button>
            </Grid>
        </Grid>
    )
}