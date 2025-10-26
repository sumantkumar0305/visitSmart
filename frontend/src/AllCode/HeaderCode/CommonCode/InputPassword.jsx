import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

export default function InputPassword({ formData, handleChange, name, ID, label }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      id={ID}
      autoComplete="new-password"
      value={formData[name] || ""}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
