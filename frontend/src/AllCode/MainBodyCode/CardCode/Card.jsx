import React, { useEffect, useState } from "react";
import HelperCard from "./HelperCard";
import { Box } from "@mui/material";

export default function Card({data}){
    return(
        <>
          <Box sx={{display: "flex", flexWrap: "wrap", gap: 6, mt: 5, ml: 4, mr: 4, mb: 5, justifyContent: "center",}}>
            {data.map((item) => (
              <HelperCard data={item} />
            ))}
          </Box>
        </>
    );
}