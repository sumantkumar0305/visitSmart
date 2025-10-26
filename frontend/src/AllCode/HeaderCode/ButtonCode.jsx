import { Button } from "@mui/material"

export default function ButtonCode({label, handleOnClick}){
    return(
        <Button
            variant="contained"
            sx={{
            backgroundColor: '#ffca28',
            color: '#000',
            fontWeight: 'bold',
            borderRadius: '20px',
            paddingX: 3,
            paddingY: 1,
            boxShadow: '0 2px 6px rgba(255, 202, 40, 0.6)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#ffc107',
                boxShadow: '0 4px 12px rgba(255, 193, 7, 0.8)',
                transform: 'translateY(-2px)',
            },
            textTransform: 'none',
            }}
            onClick={handleOnClick}
        >
            {label}
        </Button>
    );
}