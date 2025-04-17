import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlantCard from "../reusable-code/PlantCard";
import "../custom-css/PlantSearch.css";

function PlantSearch() {
  const { gardenId } = useParams(); //grabs the gardenId from the URL.
  const [plants, setPlants] = useState(null);
  const [selectedPlantType, setSelectedPlantType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function fetchPlants() {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/plant/${gardenId}/search-plants?selectedPlantType=${selectedPlantType}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!ignore) {
        setPlants(data);
        console.log(data);
      }
    }
    fetchPlants();
    return () => {
      ignore = true;
    };
  }, [gardenId, selectedPlantType]);

  if (!plants) {
    return (
      <div className="title">Please wait while your plants are picked...</div>
    );
  }

  //this maps through the fetched list of plants and
  //assigns each plantObject to the "plant" prop to pass into the PlantCard function
  //aslo pass gardenId to PlantCard in prop "gardenId"
  const plantList = plants.map((plantObject) => (
    <PlantCard
      key={plantObject.id}
      plant={plantObject}
      gardenId={gardenId}
    ></PlantCard>
  ));

  const handleNavigateGardenDetails = () => {
    navigate(`/garden-details/${gardenId}`);
  };

  async function handleSelectPlantTypeChange(event) {
    setSelectedPlantType(event.target.value);
  }

  return (
    <div className="container">
      <h2 className="title">Find plants for your garden!</h2>
      <button className="garden-button" onClick={handleNavigateGardenDetails}>
        VIEW YOUR GARDEN
      </button>

      <div>
        <br></br>
        <div className="dropdown-container">
          <select
            className="plant-type-filter"
            value={selectedPlantType}
            onChange={handleSelectPlantTypeChange}
          >
            <option value="">All Plant Types</option>
            <option value="fern">fern</option>
            <option value="grass">Grasses</option>
            <option value="herbaceous - flowering">
              Herbaceous and/or Flowering
            </option>
            <option value="shrub">Shrubs</option>
            <option value="tree">Trees</option>
            <option value="vine">Vines</option>
          </select>
        </div>
        <div className="plant-grid">{plantList}</div>
      </div>
    </div>
  );
}

export default PlantSearch;
