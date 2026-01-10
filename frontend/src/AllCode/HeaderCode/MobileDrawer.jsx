import { 
    Drawer,
    Box,
    List,
    Avatar, 
} from "@mui/material";
import ButtonCode from "./ButtonCode";

export default function MobileDrawer({
    drawerOpen, 
    toggleDrawer, 
    handleHomeClick, 
    handleAboutClick, 
    handleLoginClick, 
    handleSignupClick,
    user,
    isLogin,
    handleProfileOpen
}){
    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 150 }} onClick={toggleDrawer(false)}>
            <List>
                <Box sx={{mb: 3}}>
                <ButtonCode label="Home" handleOnClick={handleHomeClick} />
                </Box>

                <Box sx={{mb: 3}}>
                <ButtonCode label="About" handleOnClick={handleAboutClick} />
                </Box>

                {!isLogin ? (
                <>
                    <Box sx={{mb: 3}}>
                    <ButtonCode label="Login" handleOnClick={handleLoginClick} />
                    </Box>
                    <Box sx={{mb: 3}}>
                    <ButtonCode label="Sign up" handleOnClick={handleSignupClick} />
                    </Box>
                </>
                ) : (
                <Box sx={{mb: 3}}>
                    <ButtonCode label="Log out" handleOnClick={handleLogoutClick} /> 
                </Box>
                )}
            </List>
            </Box>
        </Drawer>
    )
}
