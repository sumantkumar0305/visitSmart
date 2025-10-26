import { Box, Typography } from "@mui/material"

export default function BottomCode(){
    return(
        <Box
          mt={6}
          textAlign="center"
          sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 3, opacity: 0.7 }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Janshayak. All rights reserved.
          </Typography>
        </Box>
    )
}