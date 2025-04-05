import { useState, useEffect } from "react";
import React from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Container, Box, Button, inputClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoFetching from "../reusable-code/PhotoFetching";
import Forecast from "../reusable-code/FiveDayForecast";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import GrassIcon from "@mui/icons-material/Grass";

// material ui colors link https://materialui.co/colors
const DashboardAdmin = () => {
  const navigate = useNavigate();
  const adminUserId = 2;
  const adminGardenId = 3;
  const iconColors = ['#FF8F00', '#E91E63', '#6A1B9A', '#388E3C'];

// admin zip code default for presenting
  const zip = "90210";
   

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
          <Grid container spacing={2}>
            {/* Left: Garden Containers */}
            <Grid item xs={6}>
              <Grid container spacing={2} direction="column">
                {/* Large Cover Photo Container */}
                <Grid item xs={12}>
                  <Card sx={{ minHeight: 350, height: "auto" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                      <PhotoFetching gardenId={adminGardenId} userId={adminUserId} />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Small Containers Below if the icons are not appearing  npm install @mui/icons-material*/}
                <Grid container spacing={2} item xs={12}>
                  {[EmojiNatureIcon, LocalFloristIcon, FilterVintageIcon, GrassIcon].map((IconComponent, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Card sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <CardContent sx={{ textAlign: "center" }}>
                            <IconComponent sx={{ fontSize: 50, color: iconColors[index] }} /> {/* Icon used here */}
                            <Typography variant="body1">Garden {index + 1}</Typography>
                          </CardContent>
                        </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Create New Garden Button */}
              <Grid item sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button 
                  variant="contained" 
                  sx={{ backgroundColor: "#cce3de", color: "black", "&:hover": { backgroundColor: "#b0d4c2" } }}  
                  onClick={() => navigate("/create-garden")}
                >
                  Create New Garden
                </Button>
              </Grid>
            </Grid>

            {/* Right: Weather & Nurseries */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                {/* Weather Forecast */}
                <Grid item xs={12}>
                  <Card sx={{ minHeight: 300, height: "auto" }}>
                    <CardContent>
                      <Forecast zip={zip} />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Nurseries Section */}
                <Grid item xs={12}>
                  <Card sx={{ height: 300 }}>
                  <CardContent>
                    <Typography variant="h6">Nurseries in Your Area</Typography>
                    
                  </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default DashboardAdmin;
