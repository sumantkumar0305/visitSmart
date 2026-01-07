import { 
    Typography, 
    Paper,
    Stack,
    Divider,
    Box,
} from "@mui/material"

export default function PriceBox({roomRent, gstPrice, otherCharge, totalCharge}){
    const PriceRow = ({ label, value, isTotal = false }) => (
    <Box
        sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: isTotal ? 0 : 1.5, // Add spacing for normal rows, none for total
        }}
    >
        <Typography
        variant={isTotal ? "h6" : "body2"}
        color={isTotal ? "text.primary" : "text.secondary"}
        fontWeight={isTotal ? 700 : 500}
        >
        {label}
        </Typography>
        <Typography
        variant={isTotal ? "h6" : "body1"}
        fontWeight={isTotal ? 800 : 600}
        color={isTotal ? "primary.main" : "text.primary"}
        >
        ₹{value.toLocaleString()}
        </Typography>
    </Box>
    );
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                bgcolor: "grey.50", // Light background to separate from main white card
                border: "1px solid",
                borderColor: "divider"
            }}
        >
            <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ opacity: 0.9 }}>
                Payment Breakdown
            </Typography>

            <Stack spacing={0}>
                {/* Individual Charges */}
                <PriceRow label="Room Rent" value={roomRent} />
                <PriceRow label="GST & Taxes (18%)" value={gstPrice} />
                <PriceRow label="Service & Other Charges" value={otherCharge} />

                {/* Divider */}
                <Divider sx={{ my: 2, borderStyle: "dashed" }} />

                {/* Final Total */}
                <PriceRow label="Total Payable Amount" value={totalCharge} isTotal={true} />
            </Stack>
        </Paper>
    );
}