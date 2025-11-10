import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Location({ aboutSite }) {
  // Create a Google Maps URL from address details
  const mapQuery = `${aboutSite?.city}, ${aboutSite?.state}, ${aboutSite?.pincode}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

  return (
    <Box
      sx={{
        bgcolor: "#f5f7fa",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#1976d2",
            borderBottom: "2px solid #1976d2",
            display: "inline-block",
            pb: 0.5,
          }}
        >
          Location:
        </Typography>

        {/* Map icon with tooltip */}
        <Tooltip title="View on Google Maps">
          <IconButton
            component="a"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 1, color: "#1976d2" }}
          >
            <LocationOnIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: "#444",
          fontSize: "1rem",
          lineHeight: 1.8,
        }}
      >
        <b>State:</b> {aboutSite?.state} <br />
        <b>City:</b> {aboutSite?.city} <br />
        <b>Address:</b> {aboutSite?.location}, {aboutSite?.pincode}
      </Typography>
    </Box>
  );
}
