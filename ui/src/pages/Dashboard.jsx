import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Forecast from "../reusable-code/FiveDayForecast";
import PhotoFetching from "../reusable-code/PhotoFetching";
import NurserySearch from "../reusable-code/NurserySearch";
import { useMyContext } from "../store/ContextApi";

import "../custom-css/Dashboard.css"; // Create this for layout styles

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useMyContext();
  const userId = currentUser?.id;
  const username = currentUser?.username;
  const { zipCode, updateZipCode } = useMyContext();
  const [inputZip, setInputZip] = useState("");

  const handleSubmit = () => {
    const trimmedZip = inputZip.trim();
    //regex validates exactly 5 digits are entered
    if (/^\d{5}$/.test(trimmedZip)) {
      updateZipCode(trimmedZip);
    } else {
      alert("Invalid ZIP code format.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="personalize-container">
        <label htmlFor="zip" className="personalize-label">
          Let's personalize your Dashboard! Enter your ZIP code:
        </label>
        <div>
          <input
            type="text"
            id="zip"
            value={inputZip}
            onChange={(e) => setInputZip(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 90210"
            className="dashboard-form"
          />

          <button className="garden-button" onClick={handleSubmit}>
            Personalize!
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Left Section */}
        <div className="dashboard-left">
          <div className="card garden-card">
            {/* <h2>{username}'s Gardens</h2> */}
            <div className="card-content">
              {/* this validates the user on the backend */}
              <PhotoFetching userId={userId} />
            </div>
          </div>

          <div className="personalize-container">
            <button
              className="dashboard-button"
              onClick={() => navigate("/photo-upload")}
            >
              Upload a Photo of your Garden!
            </button>
            <button
              className="dashboard-button"
              onClick={() => navigate("/create-garden")}
            >
              Create New Garden
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="dashboard-right">
          <div className="card">
            <div className="card-content center">
              <Forecast />
            </div>
          </div>

          <div className="card nursery-card">
            <div className="card-content">
              <h2>Nurseries in Your Area</h2>
              <div className="nursery-scroll">
                <NurserySearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
