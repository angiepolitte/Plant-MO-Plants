import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMyContext } from "../store/ContextApi";
import api from '../services/api';
import { GardenContext } from '../store/GardenContext';
import axios from 'axios';

function GardenZone() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);

  const handleChange = (e) => {
    setGardenData({ ...gardenData, gardenZone: e.target.value });
  };

  const handleNext = async () => {
    navigate("/garden-conditions");
    }
    // move to next page

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Enter Your Hardiness Zone</h1>
      <input value={gardenData.gardenZone} onChange={handleChange} />
      <button onClick={handleNext}>Next</button>
  </div>
);
}


export default GardenZone;