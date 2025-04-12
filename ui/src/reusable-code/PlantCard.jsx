import React from "react";
import "../custom-css/PlantCard.css";
import { Link } from "react-router-dom";

function PlantCard({ plant }) {
  return (
    <div className="plantCard">
      <div>
        <Link to={`/plant-details/${plant.id}`}>
          <img
            className="plantCard-image"
            src={plant.plantImagePath}
            alt={`Picture of ${plant.commonName}`}
          />
          <h2 className="plantCard-title">{plant.commonName}</h2>
          <br></br>
        </Link>
      </div>
      <div>
        <button className="plantCard-button">ADD TO GARDEN</button>
      </div>
    </div>
  );
}

export default PlantCard;
