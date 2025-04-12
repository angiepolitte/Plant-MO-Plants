import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Grid2 } from "@mui/material";
import PlantCard from "../reusable-code/PlantCard";
import "../custom-css/PlantSearch.css";

function PlantSearch() {
  const { gardenId } = useParams(); //grabs the gardenId from the URL.
  const [plants, setPlants] = useState(null);
  const navigate = useNavigate();

  const handleNavigateGardenDetails = () => {
    navigate("/garden-details");
  };

  useEffect(() => {
    let ignore = false;
    async function fetchPlants() {
      const response = await fetch(
        `http://localhost:8080/plant/${gardenId}/search-plants`
      );
      const data = await response.json();

      if (!ignore) {
        setPlants(data);
      }
    }
    fetchPlants();
    return () => {
      ignore = true;
    };
  }, [gardenId]);

  //this maps through the fetched list of plants and
  //assigns each plantObject to the "plant" prop to pass into the PlantCard function
  const plantList = plants.map((plantObject) => (
    <PlantCard key={plantObject.id} plant={plantObject}></PlantCard>
  ));

  if (!plants) {
    return (
      <div className="title">Please wait while your plants are picked...</div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">Find plants for your garden!</h2>
      <button className="garden-button" onClick={handleNavigateGardenDetails}>
        VIEW YOUR GARDEN
      </button>
      <div>
        {plantList}
        <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid2 xs={12} sm={6} md={4}>
            <PlantCard />
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <PlantCard />
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <PlantCard />
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <PlantCard />
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
}

export default PlantSearch;
