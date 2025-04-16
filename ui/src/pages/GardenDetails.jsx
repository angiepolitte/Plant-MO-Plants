import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import PlantCard from '../reusable-code/PlantCard.jsx';
import '../custom-css/PlantCard.css';
import '../custom-css/GardenDetail.css';
import { GardenContext } from "../store/GardenContext.jsx";
import { lightOptions, waterOptions, soilOptions } from "../reusable-code/gardenConditionsSelect";
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

function GardenDetails() {
  const { gardenId } = useParams();
  const [garden, setGarden] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("JWT_TOKEN");
  const csrfToken = localStorage.getItem("CSRF_TOKEN");
  const [currentUser, setCurrentUser] = useState(null);
  const { gardenData } = useContext(GardenContext);

  // Utility to match selected value with image/label
  const getConditionDetails = (options, value) =>
    options.find((option) => option.value === value);


  useEffect(() => {
    fetch("http://localhost:8080/api/garden/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/garden/garden-details/${gardenId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setGarden(data);
        setNewName(data.name);
      });
  }, [gardenId]);

  const handleNameSave = () => {

    const confirm = window.confirm("Are you sure you want to rename this garden?");
    if (!confirm) return;

    const updatedGardenDTO = {
      gardenName: newName,
      gardenZone: garden.gardenZone,
      gardenLight: garden.gardenLight,
      gardenWater: garden.gardenWater,
      gardenSoil: garden.gardenSoil
    };

    fetch(`http://localhost:8080/api/garden/garden-details/${gardenId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedGardenDTO)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((updated) => {
        setGarden(updated);
        setEditMode(false);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  if (!garden) return <div>Loading garden...</div>;

  // Get matching condition data (label + img) from shared arrays
  const light = getConditionDetails(lightOptions, garden.gardenLight);
  const water = getConditionDetails(waterOptions, garden.gardenWater);
  const soil = getConditionDetails(soilOptions, garden.gardenSoil);

  return (
    <div className="garden-details-wrapper">
      <div className="garden-details-container">
        <div className="top-bar">
          <div className="left">
            {editMode ? (
              <div className="edit-name">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button onClick={handleNameSave}>SAVE</button>
                <span className="edit-icon" onClick={() => setEditMode(false)}>CANCEL</span>
              </div>
            ) : (
              <h1 className="garden-name">{garden.gardenName} <span className="edit-icon" onClick={() => setEditMode(true)}>✏️</span></h1>
            )}
          </div>
          <div className="right">
            <a href={`/print/${garden.id}`} target="_blank" rel="noreferrer">
              <button className="print-button">PRINT GARDEN PLAN</button>
            </a>
            <a href="/dashboard">
              <button className="nursery-button">FIND A NURSERY &gt;</button>
            </a>
          </div>
        </div>

        <div className="main-content">
          <img src={garden.imageUrl || '/images/garden-placeholder-photo.jpg'} alt="Garden" className="feature-image" />

          <div className="conditions-box">
            <p><strong>Zone:</strong> {garden.gardenZone}</p>

            {light && (
              <div className="condition-item">
                <img src={light.img} alt={light.label} className="condition-image" />
                <p>{light.label}</p>
              </div>
            )}

            {water && (
              <div className="condition-item">
                <img src={water.img} alt={water.label} className="condition-image" />
                <p>{water.label}</p>
              </div>
            )}

            {soil && (
              <div className="condition-item">
                <img src={soil.img} alt={soil.label} className="condition-image" />
                <p>{soil.label}</p>
              </div>
            )}
          </div>
        </div>

        <div className="plants-section">
          <div className="plants-header">
            <h1 className="garden-name">Plants in this Garden:</h1>
            <a href={`/plant-search/${garden.id}`}>
              <button className="print-button">ADD MORE PLANTS</button>
            </a>
          </div>
          {garden.plants && garden.plants.length > 0 ? (
            <div className="plant-list">
              {garden.plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <p>No plants yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GardenDetails;