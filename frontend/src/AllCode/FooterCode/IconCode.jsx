import { IconButton } from "@mui/material";

export default function IconCode({ href, Icon }) {
  return (
    <IconButton
      aria-label="social-icon"
      href={href}
      target="_blank"
      rel="noopener"
      sx={{ color: '#fff' }}
    >
      <Icon />
    </IconButton>
  );
}
