import { Grid, Box, Typography, Divider } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function HotelDes({hotelData}){
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
        <Grid item xs={12} md={5} sx={{ maxWidth: 500 }}>
          <Box sx={cardStyle}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <InfoOutlinedIcon color="primary" />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About Hotel
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
              }}
            >
              {hotelData.aboutHotel}
            </Typography>
          </Box>
        </Grid>
    )
}