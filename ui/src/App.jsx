import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import WeatherWidget from "./reusable-code/WeatherWidget";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CreateGarden from "./pages/CreateGarden";
import GardenConditions from "./pages/GardenConditions";
import DashboardAdmin from "./pages/DashboardAdmin";
import GardenDetails from "./pages/GardenDetails";
import GardenZone from "./pages/GardenZone";
import GardenSuccess from "./pages/GardenSuccess";
import Comment from "./reusable-code/Comment";
import PhotoUpload from "./reusable-code/PhotoUpload";
import Login from "./auth/login";
import Footer from "./reusable-code/Footer";
import { Container, Box } from "@mui/material";
import NavBar from "./reusable-code/NavBar";
import NurseryList from "./reusable-code/NurseryList";
import NurserySearch from "./reusable-code/NurserySearch";
import PlantCard from "./reusable-code/PlantCard";
import PlantSearch from "./pages/PlantSearch";
import Signup from "./auth/SignUp";
import OAuth2RedirectHandler from "./auth/Oauth2RedirectHandler";

function App() {
  return (
    <Router>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavBar />
        <Box sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<DashboardAdmin />} />
            <Route path="/create-garden" element={<CreateGarden />} />
            <Route path="/garden-zone" element={<GardenZone />} />
            <Route path="/garden-conditions" element={<GardenConditions />} />
            <Route path="/garden-success" element={<GardenSuccess />} />
            <Route path="/plant-search" element={<PlantSearch />} />
            <Route path="/garden-details" element={<GardenDetails />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/photo-upload" element={<PhotoUpload />} />
            <Route path="/results" element={<NurseryList />} />
            <Route path="/nursery-search" element={<NurserySearch />} />
            <Route path="/plant-card" element={<PlantCard />} />
          </Routes>
        </Box>

        <Footer />
        <WeatherWidget />
      </Container>
    </Router>
  );
}

export default App;
