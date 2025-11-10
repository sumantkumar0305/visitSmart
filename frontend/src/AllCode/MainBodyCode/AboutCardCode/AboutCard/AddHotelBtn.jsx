import React from "react";
import { Box, Button } from "@mui/material";

export default function AddHotelBtn({addNewHotel}){
    return (
        <Box className="box" sx={{ display: "flex", justifyContent: "flex-end",  mt: 3}}>
            <Button
            onClick={addNewHotel}
            variant="contained"
            sx={{
                bgcolor: "#1976d2",        
                color: "#fff",              
                fontWeight: "bold",
                px: 4,                      
                py: 1.5,                    
                borderRadius: 2,            
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                textTransform: "none",      
                transition: "0.3s all ease",

                "&:hover": {
                bgcolor: "#115293",       // Darker blue on hover
                boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                },
            }}
            >
            Add Hotel
            </Button>
        </Box>
    )
}