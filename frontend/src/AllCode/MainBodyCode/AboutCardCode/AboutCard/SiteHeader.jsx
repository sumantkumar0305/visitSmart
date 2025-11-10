import React from "react";
import { Box, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function SiteHeader({title, rating, handleReviewClick}){
    return(
        <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            gap={2}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                ml: { xs: 0, sm: 5 },
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                }}
            >
                {title}
            </Typography>

            <Box
                onClick={handleReviewClick}
                sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 0.75 },
                bgcolor: "#ff9800",
                color: "white",
                fontSize: { xs: 20, sm: 24 },
                fontWeight: "bold",
                borderRadius: "30px",
                boxShadow: 2,
                gap: 0.5,
                alignSelf: { xs: "flex-start", sm: "center" },
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.05)",
                },
                }}
            >
                {rating}
                <StarBorderIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            </Box>
        </Box>
    );
}