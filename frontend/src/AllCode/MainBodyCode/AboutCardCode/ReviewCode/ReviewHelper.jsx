import { Box, Rating, Typography, TextField, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star";

export default function Comment({handleSubmit, handleRatingChange, handleCommentChange, comment, rating}){
    return(
        <>
            <Box textAlign="center" sx={{ mb: 3 }}>
          <Typography
            component="legend"
            sx={{ fontSize: "1.1rem", fontWeight: 600, color: "#000000" }}
          >
            Your Rating
          </Typography>
          <Rating
            name="user-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
            precision={1}
            icon={<StarIcon fontSize="inherit" htmlColor="#e8eb34" />}
            emptyIcon={<StarIcon fontSize="inherit" htmlColor="white" />}
          />
        </Box>

        {/* 💬 Comment Section */}
        <TextField
          required
          label="Wtite Your Comment"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
        />

        {/* 🚀 Submit Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "30px",
            backgroundColor: "#ff9800",
            boxShadow: "0px 3px 10px rgba(255,152,0,0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e68900",
              transform: "scale(1.03)",
            },
          }}
        >
          Submit Review
        </Button>
        </>
    )
}