import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import PlantCard from "../reusable-code/PlantCard.jsx";
import "../custom-css/PlantCard.css";
import "../custom-css/GardenDetail.css";
import { GardenContext } from "../store/GardenContext.jsx";
import {
  lightOptions,
  waterOptions,
  soilOptions,
} from "../reusable-code/gardenConditionsSelect";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

function GardenDetails() {
  const { gardenId } = useParams();
  const [garden, setGarden] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("JWT_TOKEN");
  const csrfToken = localStorage.getItem("CSRF_TOKEN");
  const [currentUser, setCurrentUser] = useState(null);
  const { gardenData } = useContext(GardenContext);
  const printRef = useRef();
  const location = useLocation();
  const photo = location.state?.photo;

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
    const confirm = window.confirm(
      "Are you sure you want to rename this garden?"
    );
    if (!confirm) return;

    const updatedGardenDTO = {
      gardenName: newName,
      gardenZone: garden.gardenZone,
      gardenLight: garden.gardenLight,
      gardenWater: garden.gardenWater,
      gardenSoil: garden.gardenSoil,
    };

    fetch(`http://localhost:8080/api/garden/garden-details/${gardenId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedGardenDTO),
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

  const handlePrint = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `${garden.gardenName}_Garden_Plan.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!garden) return <div>Loading garden...</div>;

  // Get matching condition data (label + img) from shared arrays
  const light = getConditionDetails(lightOptions, garden.gardenLight);
  const water = getConditionDetails(waterOptions, garden.gardenWater);
  const soil = getConditionDetails(soilOptions, garden.gardenSoil);

  return (
    <>
      {/* Hidden PDF Layout for printing */}
      <div style={{ display: "none" }}>
        <div
          ref={printRef}
          id="pdf-content"
          style={{
            padding: "30px",
            fontFamily: "Arial, sans-serif",
            width: "8.5in",
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          {/* Logo (optional) */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src="/images/plant-mo-plants-logo.png"
              alt="Plant MO Plants! Logo"
              style={{ width: "300px", height: "auto" }}
            />
          </div>

          <h1
            style={{
              textAlign: "left",
              borderBottom: "2px solid #ccc",
              paddingBottom: "10px",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            {garden.gardenName}
          </h1>

          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#2c7a7b" }}>Garden Conditions</h2>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                <strong>Zone:</strong> {garden.gardenZone}
              </li>
              <li>
                <strong>Light:</strong> {light?.label}
              </li>
              <li>
                <strong>Water:</strong> {water?.label}
              </li>
              <li>
                <strong>Soil:</strong> {soil?.label}
              </li>
            </ul>
          </div>

          <div>
            <h2 style={{ color: "#2c7a7b", marginBottom: "10px" }}>
              Plants in this Garden
            </h2>
            {garden.plants && garden.plants.length > 0 ? (
              Object.entries(
                garden.plants.reduce((grouped, plant) => {
                  const type = plant.plantType || "Unknown Type";
                  if (!grouped[type]) grouped[type] = [];
                  grouped[type].push(plant);
                  return grouped;
                }, {})
              ).map(([type, plants]) => (
                <div key={type} style={{ marginBottom: "2rem" }}>
                  <h3
                    style={{
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "5px",
                      fontSize: "1rem",
                      color: "#3E2723",
                    }}
                  >
                    {type}
                  </h3>
                  <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                    {plants
                      .sort((a, b) =>
                        (a.commonName || "").localeCompare(b.commonName || "")
                      )
                      .map((plant) => (
                        <li
                          key={plant.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: "0.95rem" }}>
                              {plant.commonName || plant.scientificName}
                            </strong>
                          </div>
                          {plant.imageUrl && (
                            <img
                              src={plant.imageUrl}
                              alt={plant.commonName}
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                              }}
                            />
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No plants in this garden yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Visible UI */}
      <div className="garden-details-wrapper">
        <div className="garden-details-container">
          <div className="top-bar">
            <div className="left">
              {editMode ? (
                <div className="edit-name">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <button onClick={handleNameSave}>SAVE</button>
                  <span
                    className="edit-icon"
                    onClick={() => setEditMode(false)}
                  >
                    CANCEL
                  </span>
                </div>
              ) : (
                <h1 className="garden-name">
                  {garden.gardenName}{" "}
                  <span className="edit-icon" onClick={() => setEditMode(true)}>
                    ✏️
                  </span>
                </h1>
              )}
            </div>
            <div className="right">
              <button className="print-button" onClick={handlePrint}>
                PRINT GARDEN PLAN
              </button>
              <a href="/dashboard">
                <button className="nursery-button">FIND A NURSERY &gt;</button>
              </a>
            </div>
          </div>

          <div className="main-content">
            {photo ? (
              <img
                src={`data:image/jpeg;base64,${photo.photoImage}`}
                alt={photo.photoName}
                style={{
                  width: "800px",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "800px",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  border: "2px dashed #ccc",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                No photo has been uploaded for this garden yet.
              </div>
            )}

            <div className="conditions-box">
              <p>
                <strong>Zone:</strong> {garden.gardenZone}
              </p>

              {light && (
                <div className="condition-item">
                  <img
                    src={light.img}
                    alt={light.label}
                    className="condition-image"
                  />
                  <p>{light.label}</p>
                </div>
              )}

              {water && (
                <div className="condition-item">
                  <img
                    src={water.img}
                    alt={water.label}
                    className="condition-image"
                  />
                  <p>{water.label}</p>
                </div>
              )}

              {soil && (
                <div className="condition-item">
                  <img
                    src={soil.img}
                    alt={soil.label}
                    className="condition-image"
                  />
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
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    gardenId={garden.id}
                  />
                ))}
              </div>
            ) : (
              <p>No plants yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GardenDetails;
