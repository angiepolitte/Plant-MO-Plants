import React from "react";
import "../custom-css/PlantCard.css";
import "../custom-css/PlantDetails.css";
import "../reusable-code/StarRating";

const PlantDetails = () => {
  return (
    <div className="plant-container">
      <img
        className="plant-image"
        src="https://www.rareroots.com/cdn/shop/files/HeucheraGreenSpice.jpg?v=1703167230&width=1920"
        alt="Picture of green coral bells"
      />
      <div className="plant-quick-info">
        <h2>Coral Bells</h2>
        <ol className="plant-info-list">
          <li>Perennial</li>
          <li>Attract pollinators</li>
          <li>Light: Full Sun/Part Sun-Part Shade</li>
          <li>Water: Dry/Moderate</li>
          <li>Soil: Light, Medium, Heavy</li>
        </ol>
        <div>
          <br></br>
          <button className="plantCard-button">ADD TO GARDEN</button>
        </div>
      </div>
      <div className="plant-description">
        <h2 className="plant-quick-info">Description</h2>
        <p>
          Dense mounds of round, mottled foliage, 12 to 24 inches tall, are the
          main feature. Foliage can remain green through winter. Slender flower
          stalks, 24 to 36 inches tall, bear many pea-sized, cream-colored
          flowers April-June. A similar species, Heuchera richardsonii, can
          tolerate somewhat dryer conditions in full sun.
        </p>
      </div>
    </div>
  );
};

export default PlantDetails;
