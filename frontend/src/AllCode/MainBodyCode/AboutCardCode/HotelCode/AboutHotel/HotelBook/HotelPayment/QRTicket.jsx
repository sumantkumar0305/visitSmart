import { 
    Dialog,
    DialogContent,
    Typography,
    Button
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

export default function QRTicket({openTicket, setOpenTicket, Name, totalRooms, totalCharge, bookingId}){
    return (
        <Dialog open={openTicket} maxWidth="xs" fullWidth>
            <DialogContent sx={{ textAlign: "center", p: 4 }}>
                <Typography variant="h6" fontWeight={700}>
                    Booking Confirmed 🎉
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    Booking ID: <b>{bookingId}</b>
                </Typography>

                <QRCodeCanvas
                    value={JSON.stringify({
                        bookingId,
                        name: Name,
                        rooms: totalRooms,
                        total: totalCharge
                    })}
                    size={220}
                />

                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                    Show this QR at hotel reception at th
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() => setOpenTicket(false)}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    )
}