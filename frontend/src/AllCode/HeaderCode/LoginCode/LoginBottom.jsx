import { Grid, Link } from "@mui/material";

export default function LoginBottom({href}){
    return(
        <Grid container justifyContent="flex-end">
            <Grid item>
            Don’t have an account?  
            <Link
                href={href}
                variant="body2"
                underline="hover"
            >
                Register here
            </Link>
            </Grid>
        </Grid>
    );
}