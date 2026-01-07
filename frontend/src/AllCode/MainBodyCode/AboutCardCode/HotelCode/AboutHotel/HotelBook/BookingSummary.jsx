import React from "react";
import { Stack, Chip } from "@mui/material";

export default function BookingSummary({ totalRooms, roomRent }) {
  return (
    <Stack
      direction="row"
      sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
    >
      <Chip
        label={`Total Rooms Selected: ${totalRooms}`}
        color="primary"
        variant={totalRooms > 0 ? "filled" : "outlined"}
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
        }}
      />
      <Chip
        label={`Total: ₹ ${roomRent}`}
        color="success"
        variant={totalRooms > 0 ? "filled" : "outlined"}
        sx={{
          fontWeight: 800,
          fontSize: "1.1rem",
          borderRadius: 5,
        }}
      />
    </Stack>
  );
}