import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMyContext } from "../store/ContextApi";
import api from '../services/api';
import { GardenContext } from '../store/GardenContext';
import axios from 'axios';

function GardenConditions() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGardenData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log(gardenData);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/garden/create", {
        gardenName: gardenData.gardenName,
        gardenZone: gardenData.gardenZone,
        gardenLight: gardenData.gardenLight,
        gardenWater: gardenData.gardenWater,
        gardenSoil: gardenData.gardenSoil,
      });
      console.log("Created garden:", response.data);
      navigate("/garden-success");
    } catch (error) {
      console.error("Error creating garden", error);
    }
  }; 

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Enter Your Light, Water, and Soil Conditions </h1>
      <input
        name="gardenLight"
        placeholder="Light"
        value={gardenData.gardenLight || ""}
        onChange={handleChange}
      />
      <input
        name="gardenWater"
        placeholder="Water"
        value={gardenData.gardenWater || ""}
        onChange={handleChange}
      />
      <input
        name="gardenSoil"
        placeholder="Soil"
        value={gardenData.gardenSoil || ""}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Create Garden</button>
    </div>
  );
}
export default GardenConditions;