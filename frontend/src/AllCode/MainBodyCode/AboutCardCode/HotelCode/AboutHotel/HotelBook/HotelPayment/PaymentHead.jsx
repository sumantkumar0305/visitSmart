import { 
    Box, 
    Avatar,
    Typography,
    Stack,
    Grid,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';

export default function PaymentHead({countryCode, userDetails}){
    const InfoRow = ({ icon, label, value }) => (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "grey.50",
                transition: "0.3s",
                "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-2px)"
                }
            }}
        >
            <Avatar
                sx={{
                    bgcolor: "primary.main",
                    width: 40,
                    height: 40
                }}
            >
                {icon}
            </Avatar>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
                <Typography fontWeight={600}>{value}</Typography>
            </Box>
        </Stack>
    );
    return(
        <>
            <Box textAlign="center" mb={4}>
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        mx: "auto",
                        mb: 2,
                        width: 56,
                        height: 56
                    }}
                >
                    <PaymentIcon />
                </Avatar>

                <Typography variant="h4" fontWeight={800}>
                    Confirm & Pay
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Securely complete your hotel booking
                </Typography>
            </Box>

            {/* Guest Info */}
            <Stack spacing={3} mb={4}>
                <Typography variant="h6" fontWeight={700}>
                    Guest Details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <InfoRow
                            icon={<PersonIcon />}
                            label="Guest Name"
                            value={userDetails.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoRow
                            icon={<PhoneIcon />}
                            label="Contact Number"
                            value={countryCode+ ' ' + userDetails.phone}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}