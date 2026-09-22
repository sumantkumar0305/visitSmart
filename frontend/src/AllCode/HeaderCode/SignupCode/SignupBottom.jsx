import { Grid, Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";

export default function SignupBottom({href}){
    return(
        <Grid container justifyContent="flex-end">
            <Grid item>
            Already have an account?
            <Link component={RouterLink} to={href} variant="body2" underline="hover" sx={{ ml: 0.5 }}>
                Login here
            </Link>
            </Grid>
        </Grid>
    )
}
