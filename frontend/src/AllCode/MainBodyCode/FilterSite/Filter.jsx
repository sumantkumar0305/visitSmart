import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Popover,
  Typography,
  Divider,
} from "@mui/material";
import Search from "./Search";
import StateFilter from "./StateFIlter";
import CityFilter from "./CityFilter";

export default function FilterCode({ helpersData, setData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateField, setStateField] = useState(false);
  const [cityField, setCityField] = useState(false);
  
  // State variables for filter inputs
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // 🔄 Combined Filter Logic
  useEffect(() => {
    // Start with all data
    let filtered = helpersData;

    // 1. Filter by Main Search (Title)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((helper) =>
        helper.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by State (if typed)
    if (state.trim() !== "") {
      filtered = filtered.filter((helper) =>
        // Assuming helper has a 'state' property. Change 'state' to match your data key.
        helper.state?.toLowerCase().includes(state.toLowerCase())
      );
    }

    // 3. Filter by City (if typed)
    if (city.trim() !== "") {
      filtered = filtered.filter((helper) =>
        // Assuming helper has a 'city' property. Change 'city' to match your data key.
        helper.city?.toLowerCase().includes(city.toLowerCase())
      );
    }
  
    setData(filtered);
  }, [searchTerm, state, city, helpersData, setData]);


  // Helper to clear filters
  const clearFilters = () => {
    setState("");
    setCity("");
    setStateField(false);
    setCityField(false);
    handleCloseFilter();
  };

  return (
    <>
      <Box>
        {/* 🔍 Sticky Search Bar */}
        <Search handleOpenFilter={handleOpenFilter} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        <Box sx={{ p: 2.5, minWidth: 280 }}>
          {/* HEADER with Clear Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
                Filters
            </Typography>
            <Button size="small" onClick={clearFilters} color="error">
                Clear All
            </Button>
          </Box>

          {/* STATE FILTER SECTION */}
          <StateFilter setStateField={setStateField} stateField={stateField} setState={setState} state={state} />

          <Divider />
          {/* CITY FILTER SECTION */}
          <CityFilter setCityField={setCityField} cityField={cityField} setCity={setCity} city={city} />
        </Box>
      </Popover>
    </>
  );
}