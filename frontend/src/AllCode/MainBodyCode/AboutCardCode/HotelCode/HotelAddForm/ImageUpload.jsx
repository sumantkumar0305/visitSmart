import React from "react";
import { Box, Button } from "@mui/material";

export default function ImageUpload({images, handleImageChange}){
    return(
        <>
            <Button
                variant="outlined"
                component="label"
                sx={{
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    textTransform: "none",
                    "&:hover": { borderColor: "#115293", color: "#115293" },
                }}
            >
                Upload Images
            <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
            />
            </Button>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {images.map((img, idx) => (
                <Box
                key={idx}
                component="img"
                src={URL.createObjectURL(img)}
                alt="preview"
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    objectFit: "cover",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                }}
                />
            ))}
            </Box>
            
        </>
    )
}