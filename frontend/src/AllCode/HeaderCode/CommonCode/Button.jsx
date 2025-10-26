import { Button } from "@mui/material";

export default function Btn({text}){
    return(
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
            mt: 3,
            mb: 2,
            py: 1.2,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
            }}
        >
            {text}
        </Button>
    );
}