import { 
    Stack,
    Typography,
    Chip,
    Paper,
    Grid,
} from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function StayDetails({totalRooms, userDetails}){
    return (
        <Stack spacing={3} mb={4}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight={700}>
                    Stay Information
                </Typography>
                <Chip
                    icon={<HotelIcon />}
                    label={`${totalRooms} Room(s)`}
                    color="primary"
                />
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: "grey.50"
                }}
            >
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                        <Typography variant="caption">Check-in</Typography>
                        <Typography fontWeight={700}>
                            {userDetails.checkin}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <ArrowRightAltIcon color="action" />
                    </Grid>

                    <Grid item xs>
                        <Typography variant="caption">Check-out</Typography>
                        <Typography fontWeight={700}>
                            {userDetails.checkout}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Stack>
    )
}