import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

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
        <Typography variant="h6" color="black">
          Plant MO Plants
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
