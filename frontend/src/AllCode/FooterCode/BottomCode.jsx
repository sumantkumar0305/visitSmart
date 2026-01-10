import { Box, Typography } from "@mui/material";

export default function BottomCode() {
  return (
    <Box
      // Responsive Margin Top: 4 (32px) on mobile, 6 (48px) on tablet/desktop
      mt={{ xs: 4, sm: 6 }} 
      textAlign="center"
      sx={{
        borderTop: "1px solid rgba(255,255,255,0.2)",
        // Responsive Padding Top: 2 (16px) on mobile, 3 (24px) on desktop
        pt: { xs: 2, sm: 3 },
        // Add Padding Bottom so it doesn't touch the bottom of the phone screen
        pb: { xs: 2, sm: 3 },
        // Add Horizontal Padding so text never touches the very edge of a small screen
        px: 2, 
        opacity: 0.7,
      }}
    >
      <Typography 
        variant="body2" 
        // Optional: Make font slightly smaller on very small phones if needed
        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
      >
        &copy; {new Date().getFullYear()} Janshayak. All rights reserved.
      </Typography>
    </Box>
  );
}
