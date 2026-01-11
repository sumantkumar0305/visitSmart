import { Stack, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

export default function ({hotel}){
    return(
        <>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ mb: 2, color: "text.secondary" }}
            >
                <LocationOn sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body1">{hotel.city}</Typography>
            </Stack>
        </>
    )
}
