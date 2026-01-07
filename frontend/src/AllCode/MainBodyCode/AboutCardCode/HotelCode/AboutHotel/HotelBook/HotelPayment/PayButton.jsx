import { 
    Button,
    Typography
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

export default function PayButton({totalCharge, handlePayment}){
    return(
        <>
            <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={<LockIcon />}
                onClick={handlePayment}
                sx={{
                    py: 1.8,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    background:
                        "linear-gradient(135deg, #43a047, #66bb6a)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 14px 28px rgba(0,0,0,0.25)"
                    }
                }}
            >
                Pay Securely ₹{totalCharge.toLocaleString()}
            </Button>

            <Typography
                variant="caption"
                display="block"
                align="center"
                sx={{ mt: 2, color: "text.secondary" }}
            >
                🔒 100% Secure Payments • Encrypted Transactions
            </Typography>
        </>
    )
}