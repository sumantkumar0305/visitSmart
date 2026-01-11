import { 
    Paper,
    Button,
    Container,
    TextField
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Search({handleOpenFilter, setSearchTerm, searchTerm}){
    return (
        <Paper
          square
          elevation={1}
          sx={{
            position: "sticky",
            top: 0,
            py: 2,
            backgroundColor: "background.paper",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 🔘 Filter Button */}
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={handleOpenFilter}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              textTransform: "none",
              display: { xs: "none", sm: "flex" },
            }}
          >
            Filter
          </Button>

          {/* 📝 Main Search Field */}
          <Container maxWidth="sm">
            <TextField
              fullWidth
              placeholder="Search by title..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.default",
                },
              }}
            />
          </Container>
        </Paper>
    );
}
