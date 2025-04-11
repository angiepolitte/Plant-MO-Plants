import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import "@fontsource/atma/600.css"; // from https://fonts.google.com/specimen/Atma?categoryFilters=Feeling:%2FExpressive%2FPlayful
import SetTheme from "./SetTheme";
import { useMyContext } from "../store/ContextApi";

const NavBar = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  const { setToken, setCurrentUser, setIsAdmin } = useMyContext();
  const isLoggedIn = !!localStorage.getItem("JWT_TOKEN");

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("JWT_TOKEN"); // Updated to remove token from localStorage
      localStorage.removeItem("USER"); // Remove user details as well
      localStorage.removeItem("CSRF_TOKEN");
      localStorage.removeItem("IS_ADMIN");
      setToken(null);
      setCurrentUser(null);
      setIsAdmin(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

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
        <Button
          onClick={navigateHome}
          sx={{
            cursor: "pointer",
            display: "inline-block",
            "&:hover": {
              animation: "pulse 1.5s infinite",
            },
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.05)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
          }}
        >
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
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button className="login-button" onClick={handleLogout}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Box>
        <Button
          onClick={navigateDashboard}
          sx={{ color: "purple", marginRight: "50px" }}
        >
          Dashboard
        </Button>
        <SetTheme />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
