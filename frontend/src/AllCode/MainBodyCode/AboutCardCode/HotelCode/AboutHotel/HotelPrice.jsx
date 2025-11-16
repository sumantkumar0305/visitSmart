import { Box, Typography, Button } from "@mui/material"

export default function HotelPrice({hotelData}){
    return(
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ 
          p: 3, 
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          bgcolor: "background.paper",
          maxWidth: { xs: "100%", md: 800 },
          mx: "auto",
          mb: 4
        }}
      >
          <Box>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ fontWeight: 500, mb: 0.5 }}
              >
                Price
              </Typography>

              <Typography 
                variant="h3" 
                sx={{ fontWeight: 700, color: "primary.main", lineHeight: 1.1 }}
              >
                ₹{hotelData.price}
                <Typography 
                  component="span" 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  /hour
                </Typography>
              </Typography>
          </Box>

          <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2.5,
                fontSize: "1.15rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                ":hover": {
                  boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
                }
              }}
          >
              Book Now
          </Button>
      </Box>

    )
}