import { Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function HotelImage({ hotel }) {
  return (
    <Box
      sx={{
        height: 220,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {hotel?.data?.image?.length > 0 ? (
        <Box
          component="img"
          src={hotel.data.image[0]}
          alt={hotel?.data?.name || "Hotel image"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f0f0f0",
            color: "grey.400",
          }}
        >
          <PhotoCamera sx={{ fontSize: 60 }} />
        </Box>
      )}
    </Box>
  );
}
