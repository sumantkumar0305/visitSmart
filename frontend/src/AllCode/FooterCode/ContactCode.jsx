import { Typography } from "@mui/material";

export default function ContactCode({label, value}){
    return(
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {/* Email: info@janshayak.com */}
            {label}: {value}
        </Typography>
    );
}