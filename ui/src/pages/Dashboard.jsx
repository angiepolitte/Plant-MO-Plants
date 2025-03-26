import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';
import React from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Container, Box } from "@mui/material";
import Forecast from "../reusable-code/FiveDayForecast";
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import GrassIcon from '@mui/icons-material/Grass';
import { Button } from "@mui/material";

  
  // const navigate = useNavigate();
 
  // const handleNavigate = () => {
  //   navigate('/'); // navigates to beginning
  // };
  
const icons = [EmojiNatureIcon, LocalFloristIcon, FilterVintageIcon, GrassIcon];
const colors = ["yellow", "pink", "blue", "green"];
  const Dashboard = () => {
    const navigate = useNavigate();
     
        const handleNavigateToCreateGarden = () => {
          navigate('/create-garden'); // navigates to beginning
        };

    const handleAddPhoto = () => {
      console.log("Open cover photo upload...");
    };
    return (
      <div>
      <Box sx={{ flexGrow: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Navigation Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#cce3de" }}>
          <Toolbar>
            <Typography variant="h6" color="black">Dashboard</Typography>
          </Toolbar>
        </AppBar>
  
        <Container maxWidth="lg" sx={{ flexGrow: 1, padding: 2 }}>
      {/* Main Grid Container (Ensures Left & Right Side-by-Side Layout) */}
      <Grid container spacing={2}>
        {/* Left: Garden Containers */}
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            {/* Large Container for Cover Photo */}
            <Grid item xs={12}>
              <Card sx={{ minHeight: 350, height: "auto" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <Typography variant="h6">Your Garden</Typography>
                {/* <GardenPhotoPlaceholder onUpload={handleAddPhoto} /> */}
              </CardContent>
              </Card>
            </Grid>

            {/* Small Square Containers Below */}
            <Grid container spacing={2} item xs={12}>
            {icons.map((IconComponent, index) => (
  <Grid item xs={6} sm={3} key={index}>
    <Card sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <CardContent sx={{ textAlign: "center" }}>
        {/* <IconComponent fontSize="large" sx={{ color: colors[index] }} />  */}
        <Typography variant="body1">Garden {index + 1}</Typography>
      </CardContent>
    </Card>
  </Grid>
))}
</Grid>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" sx={{ backgroundColor: "#cce3de", color: "black", "&:hover": { backgroundColor: "#b0d4c2" } }}  onClick={handleNavigateToCreateGarden}>
          Create New Garden
          </Button>
        </Grid>
        </Grid>

    {/* Right: Weather & Nurseries */}
    <Grid item xs={6}>
      <Grid container spacing={2}>
        {/* 5-Day Weather Forecast */}
        <Grid item xs={12}>
          <Card sx={{ minHeight: 300, height: "auto" }}>
            <CardContent>
              <Forecast />
            </CardContent>
          </Card>
        </Grid>

        {/* Nurseries in Your Area */}
        <Grid item xs={12}>
          <Card sx={{ height: 300 }}>
            <CardContent>
              <Typography variant="h6">Nurseries in Your Area</Typography>
              {/* Nursery details go here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Container>
  
        {/* Footer */}
        <Box component="footer" sx={{
      textAlign: "center",
      padding: 2,
      backgroundColor: "#cce3de",
      marginBottom: "20px", // Adjust this value to raise the footer further
    }}>
          <Typography variant="body2">&copy; 2025 DamaDevs Garden Dashboard</Typography>
        </Box>
      </Box>
      </div>
    );
  };

  export default Dashboard;

  