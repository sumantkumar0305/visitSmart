import { Stack, Typography } from "@mui/material"
import { Star } from "@mui/icons-material"
import { useState } from "react"

export default function HotelHeader({hotel}){
    const [review, setReview] = useState(hotel.review);
    const avgRating = review.length
  ? review.reduce((sum, r) => sum + r.rating, 0) / review.length
  : 0;

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center" // Changed from flex-start to center
                sx={{ mb: 1.5 }}
            >
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: 700,
                    color: "#1a1a1a",
                    flex: 1, // Allow name to take up space
                    pr: 1, // Add padding to not touch rating
                    }}
                >
                    {hotel.data.name}
                </Typography>

            {/* === THIS IS THE REPLACED SECTION === */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                    bgcolor: "#f59e0b", // orange pill background
                    borderRadius: "999px",
                    px: 2.5,
                    py: 0.5,
                    color: "#fff",
                    width: "fit-content",
                    flexShrink: 0, // Prevents shrinking
                    }}
                >
                    <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mr: 0.5,
                        color: "#fff",
                    }}
                    >
                    {/* {hotel.data.rating ? avgRating.toFixed(1) : "5"} */}
                    { avgRating.toFixed(1) }
                    </Typography>
                    <Star sx={{ color: "#fff", fontSize: 22 }} />
                </Stack>
            </Stack>
        </>
    )
}
