import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMyContext } from "../store/ContextApi";
import api from "../services/api";
import { GardenContext } from "../store/GardenContext";
import axios from "axios";
import "../custom-css/GardenConditions.css";
import { lightOptions, waterOptions, soilOptions } from "../reusable-code/gardenConditionsSelect";

function GardenConditions() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);
  const [showError, setShowError] = useState(false);

  const handleSelection = (name, value) => {
    setGardenData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {

    if (!gardenData.gardenLight || !gardenData.gardenWater || !gardenData.gardenSoil) {
      setShowError(true);
      return;
    }

    setShowError(false);

    try {
      const response = await api.post(`/garden/create`, {
        gardenName: gardenData.gardenName,
        gardenZone: gardenData.gardenZone,
        gardenLight: gardenData.gardenLight,
        gardenWater: gardenData.gardenWater,
        gardenSoil: gardenData.gardenSoil,
      });
      console.log("Created garden:", response.data);
      const createdGardenId = response.data.id;
      navigate(`/garden-success/${createdGardenId}`);
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
              className={gardenData[name] === option.value ? "selected" : ""}
            />
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h1>Select Your Light, Water, and Soil Conditions </h1> */}

      {renderOptions(
        "How much sunlight does your plot see?",
        "gardenLight",
        lightOptions
      )}
      {renderOptions("How much rain do you get?", "gardenWater", waterOptions)}
      {renderOptions(
        "What type of soil do you have?",
        "gardenSoil",
        soilOptions
      )}

      {showError && (
        <p className="gardenErrorMsg">
          Please select an option for each before continuing.
        </p>
      )}

      <button className="garden-button" onClick={handleSubmit}>
        Create Garden
      </button>

    </div>
  );
}

export default GardenConditions;
