import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import axios from "axios";

export default function ReviewEditForm({
  rating,
  setRating,
  comment,
  setComment,
  handleEdit
}) {

  return (
    <Box sx={{ p: 1 }}>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>
        Your Rating
      </Typography>

      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        size="large"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Edit your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleEdit}
        sx={{
          py: 1.2,
          borderRadius: 2,
          background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
          "&:hover": {
            background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
          },
        }}
      >
        Update Review
      </Button>
    </Box>
  );
}
