import { Link } from "@mui/material";

export default function LinkCode({link, text}){
    return (
        <Link
            key={text}
            href={link}
            underline="hover"
            sx={{ color: '#fff', opacity: 0.8, '&:hover': { opacity: 1 } }}
        >
            {text}
        </Link>
    );
};