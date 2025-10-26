import { Box, Typography } from "@mui/material"

export default function AboutSite({aboutSite}){
    return(
          <Box
            sx={{
              bgcolor: "#f5f7fa",
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#1976d2",
                borderBottom: "2px solid #1976d2",
                display: "inline-block",
                pb: 0.5,
                mb: 2,
              }}
            >
              About:
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#444",
                fontSize: "1rem",
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              {aboutSite?.about}
            </Typography>
          </Box>
    )
}