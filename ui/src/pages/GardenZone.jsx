import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMyContext } from "../store/ContextApi";
import api from '../services/api';
import { GardenContext } from '../store/GardenContext';
import axios from 'axios';
import '../custom-css/GardenConditions.css';

function GardenZone() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setGardenData({ ...gardenData, gardenZone: e.target.value });
    if (e.target.value !== "") {
      setShowError(false); // clear error if a valid selection is made
    }
  };

  const handleNext = async () => {
    if (gardenData.gardenZone === "") {
      setShowError(true);
    } else {
      navigate("/garden-conditions");
    }
  };

  return (
    <div className="create-garden-container">
      <h1 className="garden-heading">Select your Hardiness Zone</h1>

      {/* Dropdown selector */}
      <select
        className="zone-select"
        value={gardenData.gardenZone}
        onChange={handleChange}
      >
        <option value="">--Refer to map below and select--</option>
        <option value="5b">5b</option>
        <option value="6a">6a</option>
        <option value="6b">6b</option>
        <option value="7a">7a</option>
        <option value="7b">7b</option>
        <option value="8a">8a</option>
      </select>

      {showError && (
        <div className="error-message">Please select a Hardiness Zone before continuing.</div>
      )}

      <button className="garden-button" onClick={handleNext}>
        Next
      </button>

      {/* Map image or embedded map */}
      <img
        src="/images/hardiness-zone-map-missouri.png"
        alt="USDA Hardiness Zone Map for Missouri"
        className="zone-map"
      />
    </div>
  );
}

export default GardenZone;