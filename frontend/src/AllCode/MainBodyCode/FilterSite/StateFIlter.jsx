import { 
    Box,
    Button,
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"; 

export default function StateFilter({setStateField, stateField, setState, state}){
    return(
        <Box
        sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: stateField ? "action.hover" : "transparent",
            transition: "0.3s",
        }}
        >
        <Button
            fullWidth
            variant="text"
            onClick={() => setStateField(!stateField)} // Toggle open/close
            sx={{ justifyContent: "space-between", textTransform: "none", fontWeight: 500, color: 'text.primary' }}
        >
            Filter by State
        </Button>

        {stateField && (
            <TextField
            fullWidth
            size="small"
            label="Enter state"
            variant="outlined"
            sx={{ mt: 1.5, bgcolor: 'background.paper' }}
            // ✅ CORRECT WAY: Bind value and onChange here
            value={state} 
            onChange={(e) => setState(e.target.value)}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    {state && (
                    <IconButton size="small" onClick={() => setState("")}>
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