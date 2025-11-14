import { Box, Typography, Button } from "@mui/material"
import ReviewsIcon from "@mui/icons-material/Reviews";

export default function HotelName({hotelData}){
    return(
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {hotelData.name}
        </Typography>

        {/* Review Button */}
        <Button
          variant="contained"
          startIcon={<ReviewsIcon />}
          sx={{
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              background: "linear-gradient(90deg, #16a34a, #15803d)",
            },
          }}
        >
          Write your Feedback
        </Button>
      </Box>
    )
}