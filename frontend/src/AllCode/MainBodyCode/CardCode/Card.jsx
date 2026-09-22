import React, { useEffect, useState } from "react";
import HelperCard from "./HelperCard";
import { Box, Typography } from "@mui/material";

export default function Card({data}){
    if (!data || data.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 8, mb: 8, px: 2 }}>
                <Typography variant="h6" color="text.secondary">
                    No destinations found.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Try a different search, or check back later for new places.
                </Typography>
            </Box>
        );
    }

    return(
        <>
          <Box sx={{display: "flex", flexWrap: "wrap", gap: 6, mt: 5, ml: 4, mr: 4, mb: 5, justifyContent: "center",}}>
            {data.map((item) => (
              <HelperCard key={item._id} data={item} />
            ))}
          </Box>
        </>
    );
}