import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    IconButton
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"; 

export default function CityFilter({setCityField, cityField, setCity, city}){
    return(
        <Box
        sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: cityField ? "action.hover" : "transparent",
            transition: "0.3s",
        }}
        >
        <Button
            fullWidth
            variant="text"
            onClick={() => setCityField(!cityField)} // Toggle open/close
            sx={{ justifyContent: "space-between", textTransform: "none", fontWeight: 500, color: 'text.primary' }}
        >
            Filter by City
        </Button>

        {cityField && (
            <TextField
            fullWidth
            size="small"
            label="Enter city"
            variant="outlined"
            sx={{ mt: 1.5, bgcolor: 'background.paper' }}
            // ✅ CORRECT WAY: Bind value and onChange here
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {city && (
                        <IconButton size="small" onClick={() => setCity("")}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                        )}
                    </InputAdornment>
                ),
                }}
            />
        )}
        </Box>
    )
}