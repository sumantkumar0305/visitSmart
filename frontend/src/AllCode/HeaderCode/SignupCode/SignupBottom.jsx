import { Grid, Link } from "@mui/material"

export default function SignupBottom({href}){
    return(
        <Grid container justifyContent="flex-end">
            <Grid item>
            Already have an account?
            <Link href={href} variant="body2" underline="hover">
                Login here
            </Link>
            </Grid>
        </Grid>
    )
}