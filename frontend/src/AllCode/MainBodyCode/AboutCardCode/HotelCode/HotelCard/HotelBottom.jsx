import { Stack, Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

export default function HotelBottom({ currentUser, hotel, handleEditHotel, handleDeleteHotel, handleClickView }) {
  
  // Optional: Safety check to prevent crashing if user isn't logged in
  const isOwner = currentUser?.user?._id === hotel?.data?.owner;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={2}  // Reduced slightly so icons sit closer together
      sx={{
        mt: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        backgroundColor: "#f8fafc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* 🔐 OWNER ACTIONS (Edit & Delete) */}
      {isOwner && (
        <> 
          {/* ✏️ Edit Icon (Blue) */}
          <Tooltip title="Edit hotel">
            <IconButton
              aria-label="edit hotel"
              onClick={handleEditHotel}
              sx={{
                color: "#0ea5e9", // Sky Blue
                backgroundColor: "#e0f2fe", // Light Blue bg
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#bae6fd",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {/* 🗑️ Delete Icon (Red) */}
          <Tooltip title="Delete hotel">
            <IconButton
              aria-label="delete hotel"
              onClick={handleDeleteHotel}
              sx={{
                color: "#dc2626", // Red
                backgroundColor: "#fee2e2", // Light Red bg
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#fecaca",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {/* 👁️ View Details Button */}
      <Button
        variant="contained"
        disableElevation
        onClick={handleClickView}
        sx={{
          px: 3.5,
          py: 1,
          ml: 1, // Adds a little extra space between icons and the main button
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          background: "linear-gradient(90deg, #16a34a, #22c55e)",
          boxShadow: "0 6px 16px rgba(34, 197, 94, 0.35)",
          "&:hover": {
            background: "linear-gradient(90deg, #15803d, #16a34a)",
            boxShadow: "0 8px 22px rgba(34, 197, 94, 0.45)",
          },
        }}
      >
        View Details
      </Button>
    </Stack>
  );
}