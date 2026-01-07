import { 
    Grid,
    TextField,
    InputAdornment,
    Select,
    MenuItem, 
    Divider  
} from "@mui/material";

export default function PhoneNumber({handleChange, formData}){
    return(
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
                    name="countryCode"
                    value={formData["countryCode"]}
                    onChange={handleChange}
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
    )
}