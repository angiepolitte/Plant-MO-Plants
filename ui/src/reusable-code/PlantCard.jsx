import React from "react";
import "../custom-css/PlantCard.css";

const PlantCard = () => {
  return (
    <div className="plantCard">
      <img
        className="plantCard-image"
        src="https://www.rareroots.com/cdn/shop/files/HeucheraGreenSpice.jpg?v=1703167230&width=1920"
        alt="Picture of green coral bells"
      />
      <h2 className="plantCard-title">Coral Bells</h2>
      <br></br>
      <button className="plantCard-button">ADD TO GARDEN</button>
    </div>
  );
};

export default PlantCard;
