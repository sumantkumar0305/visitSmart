import { Button } from "@mui/material"

export default function ReviewBtn({handleSubmit}){
    return(
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1.2, 
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "30px",
            backgroundColor: "#ff9800",
            boxShadow: "0px 3px 10px rgba(255,152,0,0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e68900",
              transform: "scale(1.03)",
            },
          }}
        >
          Submit Review
        </Button>
    )
}