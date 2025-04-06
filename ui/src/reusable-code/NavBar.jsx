import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import "@fontsource/atma/600.css"; // from https://fonts.google.com/specimen/Atma?categoryFilters=Feeling:%2FExpressive%2FPlayful

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#cce3de",
        left: 0,
        width: "100%",
        textAlign: "center",
        boxShadow: 3,
        mt: "auto",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Atma, sans-serif",
            fontSize: "2rem",
            fontWeight: 600,
            color: "#3E2723",
          }}
        >
          🌱 Plant MO Plants 🌱
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
