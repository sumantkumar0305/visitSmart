import { Typography, Grid, Paper, Box, Rating, Stack } from "@mui/material";

export default function HotelCard({ hotelData }) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#2C3E50",
          textAlign: "center",
          letterSpacing: "0.5px",
        }}
      >
        🏨 Nearby Hotels
      </Typography>

      {hotelData.length > 0 ? (
        <Grid container spacing={4}>
          {hotelData.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <Paper
                elevation={5}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, #ffffff 70%, #f8fafc 100%)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: 420, // ⬅️ Increased card height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Image Section */}
                {hotel.data.image && hotel.data.image.length > 0 ? (
                  <Box
                    component="img"
                    src={hotel.data.image[0]}
                    alt={hotel.data.name}
                    sx={{
                      width: "100%",
                      height: 220, // ⬅️ Bigger image
                      objectFit: "cover",
                      borderRadius: "16px",
                      mb: 2,
                      transition: "all 0.4s ease",
                      "&:hover": { transform: "scale(1.04)" },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 220,
                      borderRadius: "16px",
                      mb: 2,
                      bgcolor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                      fontStyle: "italic",
                    }}
                  >
                    No Image Available
                  </Box>
                )}

                {/* Hotel Name + Rating */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1a1a1a",
                      flex: 1,
                    }}
                  >
                    {hotel.data.name}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating
                      name="hotel-rating"
                      value={hotel.data.rating || 0}
                      precision={0.5}
                      readOnly
                      size="medium"
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#f59e0b", // golden yellow tone
                      }}
                    >
                      {hotel.data.rating ? hotel.data.rating.toFixed(1) : "—"}
                    </Typography>
                  </Stack>
                </Stack>

                {/* City */}
                <Typography variant="body1" color="text.secondary">
                  📍 {hotel.data.city}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h6"
                  sx={{
                    mt: 1.5,
                    color: "#16a34a",
                    fontWeight: 600,
                  }}
                >
                  💰 ₹{hotel.data.price.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          color="text.secondary"
          sx={{
            textAlign: "center",
            mt: 4,
            fontStyle: "italic",
            fontSize: "1.1rem",
          }}
        >
          No hotels available yet. Check back soon!
        </Typography>
      )}
    </>
  );
}
