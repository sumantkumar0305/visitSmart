import { Box } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"

export default function HotelImage({hotel}){
    const image = hotel?.image;
    return(
        <>
            <Box
                sx={{
                height: 220,
                overflow: "hidden",
                position: "relative",
                }}
            >
                {Array.isArray(image) && image.length > 0 ? (
                <Box
                    component="img"
                    src={image[0]}
                    alt={hotel.name}
                    sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    "&:hover": {
                        transform: "scale(1.1)", // Clean zoom effect
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
        </>
    )
}
