import { IconButton, InputAdornment, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function InputText({formData, handleChange, ID, label, name, type, icon: Icon}){
    return(
        <TextField
            margin="normal"
            required
            fullWidth
            id={ID}
            label={label}
            name={name}
            type={type}
            autoComplete={name}
            value={formData[name]}
            onChange={handleChange}

            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <IconButton>
                <Icon color="primary" />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    )
}