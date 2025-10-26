import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ArrowIcon({ handleLeftClick, handleRightClick}){
    return(
        <>
            <IconButton
            onClick={handleLeftClick}
            sx={{
                position: "absolute",
                top: "50%",
                left: "1px",
                transform: "translateY(-50%)",
                backgroundColor: "#000000",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
            >
            <ArrowBackIos />
            </IconButton>

            {/* Right Icon */}
            <IconButton
            onClick={handleRightClick}
            sx={{
                position: "absolute",
                top: "50%",
                right: "1px",
                transform: "translateY(-50%)",
                //backgroundColor: "rgba(255,255,255,0.7)",
                backgroundColor: "#000000",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
            >
            <ArrowForwardIos />
            </IconButton>
        </>
    )
}