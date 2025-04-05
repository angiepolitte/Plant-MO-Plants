import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import './App.css';  
import WeatherWidget from './reusable-code/WeatherWidget';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import CreateGarden from './pages/CreateGarden';
import GardenConditions from './pages/GardenConditions';
import DashboardAdmin from './pages/DashboardAdmin';
import GardenDetails from './pages/GardenDetails';
import PlantsTBD from './pages/PlantsTBD';
import GardenZone from './pages/GardenZone';
import GardenSuccess from './pages/GardenSuccess';
import Comment from './reusable-code/Comment';
import PhotoUpload from './reusable-code/PhotoUpload';
import Footer from './reusable-code/Footer';
import { Container } from '@mui/material';



function App() {
  return (
    
    <Router>
      <Container maxWidth={false} disableGutters sx={{ flex: 1 }}>     

      <WeatherWidget />
      
      
      
        <Routes>   

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<DashboardAdmin />} />
          <Route path="/create-garden" element={<CreateGarden />} />
          <Route path="/garden-zone" element={<GardenZone />} />
          <Route path="/garden-conditions" element={<GardenConditions />} />
          <Route path="/garden-success" element={<GardenSuccess />} />
          <Route path="/plantsTBD" element={<PlantsTBD />} />   // will be replaced with Allyson's file       
          <Route path="/garden-details" element={<GardenDetails />} /> 
          <Route path="/comment" element={<Comment />} />  
          <Route path="/photo-upload" element={<PhotoUpload />} /> 

              
        </Routes>
      <div>
      <Footer /> 
      </div>
      
      </Container>
    </Router>
  );
}

export default App;

