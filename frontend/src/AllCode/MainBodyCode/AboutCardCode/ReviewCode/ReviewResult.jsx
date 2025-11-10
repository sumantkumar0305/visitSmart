import { Box, Typography, Rating, Paper, Divider, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ReviewResult({reviews, handleDelete, handleEdit}){
    const userId = sessionStorage.getItem("userId");
    return(
        <>
        {reviews.length > 0 && (
          <Paper
          elevation={4} 
            sx={{
            mt: 4,
            p: { xs: 2.5, sm: 3 },
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <Typography 
              variant="h5"
            fontWeight="bold"
            sx={{ color: "#333", mb: 2 }}
          >
            📝 Submitted Reviews
          </Typography>

          <Divider sx={{ mb: 2 }} />

        {reviews.map((review, index) => (
            <Box
              key={review.id} 
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #ffe0b2",
                borderRadius: 2,
                backgroundColor: index % 2 === 0 ? "#fff8ef" : "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Reviewer name */}
                <Typography variant="subtitle1" fontWeight="bold">
                  by Sumant
                </Typography>

                {/* Rating value + stars */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight="bold" color="#333">
                    {review.rating}
                  </Typography>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={1}
                    icon={<StarIcon fontSize="inherit" htmlColor="#eb8934" />} // bright gold
                    emptyIcon={<StarIcon fontSize="inherit" htmlColor="#fff" />}
                  />
                </Box>
              </Box>

             <Box display="flex" justifyContent="space-between" pr={3} mt={3}>
               <Typography
                variant="body1"
                sx={{
                  mt: 1.5,
                  fontStyle: "italic",
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {review.comment}
              </Typography>
                
                {userId && (userId === review.author) && (
                <Box display="flex" gap={4}>
                  <Tooltip title="Delete">
                  <DeleteIcon  onClick={() => handleDelete(review._id)}  sx={{
                    "&:hover": {
                      cursor: "pointer"
                    }
                  }} />
                  </Tooltip>
                  <Tooltip title="Edit">
                  <EditIcon  onClick={() => handleEdit(review)} sx={{
                    "&:hover":{
                      cursor: "pointer"
                      
                    }
                  }}
                  />
                  </Tooltip>
                </Box>
                )}
             </Box>
            </Box>
          ))}
          </Paper>
          )} 
        </>
    );
}