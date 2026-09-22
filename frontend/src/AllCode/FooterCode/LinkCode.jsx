import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function LinkCode({link, text}){
    const isExternal = /^https?:\/\//i.test(link);

    if (isExternal) {
        return (
            <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ color: '#fff', opacity: 0.8, '&:hover': { opacity: 1 } }}
            >
                {text}
            </Link>
        );
    }

    return (
        <Link
            component={RouterLink}
            to={link}
            underline="hover"
            sx={{ color: '#fff', opacity: 0.8, '&:hover': { opacity: 1 } }}
        >
            {text}
        </Link>
    );
};
