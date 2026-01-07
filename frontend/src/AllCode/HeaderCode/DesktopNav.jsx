import { 
    Typography,
    Box,
    IconButton,
    Avatar
} from "@mui/material";
import ButtonCode from "./ButtonCode";

export default function ({
    handleAboutClick, 
    handleHomeClick, 
    handleLoginClick, 
    handleSignupClick, 
    isLogin,
    user,
    handleProfileOpen
}){
    return(
        <>
            <Typography
                variant="h5"
                component="div"
                sx={{
                fontWeight: 'bold',
                letterSpacing: 1,
                color: '#fff',
                fontFamily: 'Roboto, sans-serif',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                flexGrow: 1,
                }}
            >
                Visits Mart
            </Typography>

            {/* Desktop Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <ButtonCode label="Home" handleOnClick={handleHomeClick} />
                <ButtonCode label="About" handleOnClick={handleAboutClick} />
                {!isLogin ? (
                <>
                    <ButtonCode label="Login" handleOnClick={handleLoginClick} />
                    <ButtonCode label="Sign up" handleOnClick={handleSignupClick} />
                </>
                ) : (
                // <ButtonCode label="Logout" handleOnClick={handleLogoutClick} />
                <IconButton onClick={handleProfileOpen}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                    {user?.username?.trim()?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </IconButton>
                )}
            </Box>
        </>
    )
}