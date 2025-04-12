import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useState, useEffect } from "react";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Box,
} from "@mui/material";
import Forecast from "../reusable-code/FiveDayForecast";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import GrassIcon from "@mui/icons-material/Grass";
import { Button } from "@mui/material";
import PhotoFetching from "../reusable-code/PhotoFetching";
import { useMyContext } from "../store/ContextApi";
import NurserySearch from "../reusable-code/NurserySearch";

const icons = [EmojiNatureIcon, LocalFloristIcon, FilterVintageIcon, GrassIcon];

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [gardenId, setGardenId] = useState("");
  const [gardens, setGardens] = useState([]);

  const { currentUser } = useMyContext();
  const userId = currentUser?.id;
  const username = currentUser?.username;

  const handleNavigateToCreateGarden = () => {
    navigate("/create-garden"); // navigates to beginning
  };

  const handleAddPhoto = () => {
    console.log("Open cover photo upload...");
  };
  // const userId = 1; //to be updated with userId
  // const userGardenId = 2; //to be updated with gardenId
  const iconColors = ["#FF8F00", "#E91E63", "#6A1B9A", "#388E3C"];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center content vertically
          alignItems: "center", // Center content horizontally
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2}>
            {/* Left: Garden Section */}

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  minHeight: 400,
                  maxHeight: 600, // 👈 Set max height
                  overflowY: "auto", // 👈 Enable scroll if content overflows
                  backgroundColor: "#F3E5F5",
                }}
              >
                <Typography variant="body1" paddingTop={"1rem"}>
                  {username}'s Most Recent Garden
                </Typography>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <PhotoFetching userId={userId} />
                </CardContent>
              </Card>
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center", mt: 4 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#cce3de",
                    color: "black",
                    "&:hover": { backgroundColor: "#b0d4c2" },
                  }}
                  onClick={() => navigate("/photo-upload")}
                >
                  Upload a Photo of your Garden!{" "}
                </Button>
              </Grid>

              {/* Create New Garden Button */}
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center", mt: 4 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#cce3de",
                    color: "black",
                    "&:hover": { backgroundColor: "#b0d4c2" },
                  }}
                  onClick={() => navigate("/create-garden")}
                >
                  Create New Garden
                </Button>
              </Grid>
            </Grid>

            {/* Right: Weather & Nurseries Section */}
            <Grid item xs={12} md={6}>
              {/* Weather Forecast */}
              <Card
                sx={{
                  minHeight: 300,
                  backgroundColor: "#F3E5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 1,
                }}
              >
                <CardContent>
                  {/* <Forecast zip={zip} /> */}
                  <Forecast />
                </CardContent>
              </Card>

              {/* Nurseries Section */}
              <Card sx={{ minHeight: 300, backgroundColor: "#F3E5F5", mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" mb={1}>
                    Nurseries in Your Area
                  </Typography>
                  <NurserySearch />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
