import { 
    Typography, 
    IconButton,
    Chip,
    Stack,
    Box,
    Paper
} from "@mui/material";
import { 
    AcUnit,
    KingBed,
    SingleBed,
    MeetingRoom,  
    Add as AddIcon,
    Remove as RemoveIcon,
} from "@mui/icons-material";

export default function RoomSelection({handleDecrement, handleIncrement,roomQuantities, totalRooms, roomRent }){
    const roomTypesConfig = [
        { id: "single_ac", label: "Single Bed (AC)", icon: <AcUnit fontSize="small" color="primary" />, bedIcon: <SingleBed fontSize="small" /> },
        { id: "double_ac", label: "Double Bed (AC)", icon: <AcUnit fontSize="small" color="primary" />, bedIcon: <KingBed fontSize="small" /> },
        { id: "single_non_ac", label: "Single Bed (Non-AC)", icon: <MeetingRoom fontSize="small" color="action" />, bedIcon: <SingleBed fontSize="small" /> },
        { id: "double_non_ac", label: "Double Bed (Non-AC)", icon: <MeetingRoom fontSize="small" color="action" />, bedIcon: <KingBed fontSize="small" /> },
    ];
    return (
        <>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <KingBed color="action" /> Select Rooms
            </Typography>

            <Stack spacing={2}>
                {roomTypesConfig.map((room) => {
                    const isSelected = roomQuantities[room.id] > 0;
                    return (
                        <Paper
                            key={room.id}
                            elevation={isSelected ? 3 : 0}
                            variant={isSelected ? "elevation" : "outlined"}
                            sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderColor: isSelected ? "primary.main" : "grey.300",
                            bgcolor: isSelected ? "#f0f7ff" : "transparent",
                            transition: "all 0.3s ease",
                            transform: isSelected ? "scale(1.01)" : "scale(1)",
                            }}
                        >
                            {/* Room Info */}
                            <Box>
                                <Stack direction="row" alignItems="center" gap={1.5}>
                                    {room.bedIcon}
                                    <Typography fontWeight={600} variant="body1">
                                    {room.label}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
                                    {room.icon}
                                    <Typography variant="caption" color="text.secondary">
                                    {room.id.includes('non_ac') ? "Fan cooling only" : "Air Conditioned"}
                                    </Typography>
                                </Stack>
                            </Box>

                            {/* Counter Controls */}
                            <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: "background.paper",
                                borderRadius: 50,
                                boxShadow: isSelected ? 1 : 0,
                                border: "1px solid",
                                borderColor: "grey.200",
                                p: 0.5
                            }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => handleDecrement(room.id)}
                                    disabled={roomQuantities[room.id] === 0}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>

                                <Typography fontWeight={700} sx={{ minWidth: 24, textAlign: "center", color: isSelected ? "primary.main" : "text.primary" }}>
                                    {roomQuantities[room.id]}
                                </Typography>

                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleIncrement(room.id)}
                                    sx={{ bgcolor: isSelected ? 'primary.main' : 'transparent', color: isSelected ? '#fff' : 'primary.main', "&:hover": { bgcolor: isSelected ? 'primary.dark' : 'rgba(25, 118, 210, 0.04)' } }}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Paper>
                    )
                })}

                <Stack direction="row" sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <Chip 
                        label={`Total Rooms Selected: ${totalRooms}`} 
                        color="primary" 
                        variant={totalRooms > 0 ? "filled" : "outlined"}
                        sx={{
                            fontWeight: 700,
                            fontSize: '1rem'
                        }}
                    />
                    <Chip 
                        label={`Total: ₹ ${roomRent}`}
                        color="success" // Green color
                        variant={totalRooms > 0 ? "filled" : "outlined"}
                        sx={{ 
                            fontWeight: 800, 
                            fontSize: '1.1rem', 
                            borderRadius: 5 // Less rounded (rectangular) looks more like a price tag
                        }}
                    />
                </Stack>
            </Stack>
        </>
    )
}