import { Grid, Box, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function HotelLocation({hotelData}){
  const mapQuery = `${hotelData?.city}, ${hotelData?.state}, ${hotelData?.pincode}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

    const cardStyle = {
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        background: "linear-gradient(135deg, #f9fafb 0%, #ffffffd8 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        transform: "translateY(-3px)",
        },
    };
    
    return(
        <Grid item xs={12} md={5}>
          <Box sx={cardStyle}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Tooltip title="See on google map">
                <IconButton 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LocationOnIcon sx={{ color: "#f43f5e" }}/>
                </IconButton>
              </Tooltip>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #ef4444, #f87171)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hotel Location
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ color: "text.secondary", mb: 1.2 }}>
              <b>State:</b> {hotelData.state || "Bihar"}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 1.2 }}>
              <b>City:</b> {hotelData.city}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 1.2 }}>
              <b>Pincode:</b> {hotelData.pincode}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <b>Nearest Railway:</b> {hotelData.railway || "New Delhi"}
            </Typography>
          </Box>
        </Grid>
    )
}