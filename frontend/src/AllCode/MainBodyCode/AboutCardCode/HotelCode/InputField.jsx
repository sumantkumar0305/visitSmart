import React from "react";
import { TextField } from "@mui/material";

export default function InputField({hotelData, handleChange}){
    return(
        <>
            <TextField
                label="Hotel Name"
                name="name"
                value={hotelData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <TextField
                label="About Hotel"
                name="aboutHotel"
                value={hotelData.aboutHotel}
                onChange={handleChange}
                multiline
                rows={3}
                required
                fullWidth
            />

            <TextField
                label="Price"
                name="price"
                type="number"
                value={hotelData.price}
                onChange={handleChange}
                required
                fullWidth
            />

            <TextField
                label="City"
                name="city"
                value={hotelData.city}
                onChange={handleChange}
                required
                fullWidth
            />

            <TextField
                label="Pincode"
                name="pincode"
                value={hotelData.pincode}
                onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                required
                fullWidth
            />
        </>
    )
}