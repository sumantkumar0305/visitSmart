import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

export default function InputField({ hotelData, handleChange }) {
  return (
    <>
      {/* Hotel Name */}
      <TextField
        label="Hotel Name"
        name="name"
        value={hotelData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      {/* About Hotel */}
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

      <Typography fontWeight={600} mt={1}>
        Room Prices
      </Typography>

      {/* Prices */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Double AC Price"
            name="doubleAC_Price"
            type="number"
            value={hotelData.doubleAC_Price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Single AC Price"
            name="singleAC_Price"
            type="number"
            value={hotelData.singleAC_Price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Double Non-AC Price"
            name="doubleNonAC_Price"
            type="number"
            value={hotelData.doubleNonAC_Price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Single Non-AC Price"
            name="singleNonAC_Price"
            type="number"
            value={hotelData.singleNonAC_Price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* City */}
      <TextField
        label="City"
        name="city"
        value={hotelData.city}
        onChange={handleChange}
        required
        fullWidth
      />

      {/* Pincode */}
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
  );
}