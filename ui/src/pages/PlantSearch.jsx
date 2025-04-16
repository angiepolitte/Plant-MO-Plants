import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlantCard from "../reusable-code/PlantCard";
import "../custom-css/PlantSearch.css";

function PlantSearch() {
  const { gardenId } = useParams(); //grabs the gardenId from the URL.
  const [plants, setPlants] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function fetchPlants() {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/plant/${gardenId}/search-plants`,
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
  }, [gardenId]);

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

  return (
    <div className="container">
      <h2 className="title">Find plants for your garden!</h2>
      <button className="garden-button" onClick={handleNavigateGardenDetails}>
        VIEW YOUR GARDEN
      </button>
      <div className="plant-grid">{plantList}</div>
    </div>
  );
}

export default PlantSearch;
