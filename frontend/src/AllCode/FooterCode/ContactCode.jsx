import { Typography } from "@mui/material";

export default function ContactCode({ label, value }) {
  return (
    <Typography
      variant="body2"
      sx={{
        opacity: 0.8,
        // Responsive Font Size: Slightly smaller on mobile, standard on desktop
        fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
        // Responsive Layout: Stack vertically on very small screens if text is long
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 0.5, sm: 1 }, // Add small gap between label and value
        alignItems: { xs: "center", sm: "baseline" }, // Center on mobile, align text on desktop
        textAlign: { xs: "center", sm: "left" },
        mb: 1 // Add a little bottom margin for spacing between contact items
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}:</span>
      <span>{value}</span>
    </Typography>
  );
}
