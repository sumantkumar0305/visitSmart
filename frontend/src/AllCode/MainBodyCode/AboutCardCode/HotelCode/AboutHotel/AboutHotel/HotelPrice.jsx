import { Box, Typography } from "@mui/material"

export default function HotelPrice({hotelData}){
    return(
        <Box sx={{ mb: 5, maxWidth: { xs: "100%", md: 800 }, mx: "auto" }}>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Price
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main", my: 1 }}>
            ₹{hotelData.price}
            <Typography component="span" variant="h6" color="text.secondary">
                /hour
            </Typography>
            </Typography>
        </Box>
    )
}