import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMyContext } from "../store/ContextApi";
import api from '../services/api';
import { GardenContext } from '../store/GardenContext';
import axios from 'axios';
import '../custom-css/GardenConditions.css';

const lightOptions = [
  { label: 'Full Sun', value: 'full_sun', img: '/images/full-sun.jpg' },
  { label: 'Part Sun/Shade', value: 'part_sun_part_shade', img: '/images/part-sun-part-shade.jpg' },
  { label: 'Full Shade', value: 'full_shade', img: '/images/full-shade.jpg' },
];

const waterOptions = [
  { label: 'Dry', value: 'dry', img: '/images/single-raindrop.jpg' },
  { label: 'Moderate', value: 'moderate', img: '/images/moderate-raindrops.jpg' },
  { label: 'Wet', value: 'wet', img: '/images/heavy-raindrops.jpg' },
];

const soilOptions = [
  { label: 'Light (sandy)', value: 'light', img: '/images/light-soil.jpg' },
  { label: 'Medium (loamy)', value: 'medium', img: '/images/medium-soil.jpg' },
  { label: 'Heavy (clay)', value: 'heavy', img: '/images/heavy-soil.jpg' },
];

function GardenConditions() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);

  const handleSelection = (name, value) => {
    setGardenData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/garden/create`, {
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

  const renderOptions = (title, name, options) => (
    <div className="option-section">
      <h3 className="option-title">{title}</h3>
      <div className="option-grid">
        {options.map((option) => (
          <div
            key={option.value}
            className="option-card"
            onClick={() => handleSelection(name, option.value)}
          >
            <img
              src={option.img}
              alt={option.label}
              className={gardenData[name] === option.value ? 'selected' : ''}
            />
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      {/* <h1>Select Your Light, Water, and Soil Conditions </h1> */}
      
      {renderOptions('How much sunlight does your plot see?', 'gardenLight', lightOptions)}
      {renderOptions('How much rain do you get?', 'gardenWater', waterOptions)}
      {renderOptions('What type of soil do you have?', 'gardenSoil', soilOptions)}

      <button className='garden-button' onClick={handleSubmit}>
        Create Garden
      </button>
    </div>
  );
}

export default GardenConditions;