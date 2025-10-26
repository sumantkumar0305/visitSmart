import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import Card from "./CardCode/Card";

export default function StickySearchPage({ helpersData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHelpers = helpersData.filter((helper) =>
    helper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload on button click
  };

  return (
    <Box>
      {/* 🔍 Sticky Search Bar */}
      <Paper
        square
        onSubmit={handleSearch}
        sx={{
          position: "sticky",
          top: 0,
          p: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Container maxWidth="sm">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            component="form"
          >
            <TextField
              fullWidth
              label="Search by title..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
            <Button type="submit" variant="contained" sx={{ minWidth: 120 }}>
              Search
            </Button>
          </Stack>
        </Container>
      </Paper>

      {/* 🧩 Results Section */}
      </Box>
  );
}
