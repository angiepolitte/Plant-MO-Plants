import { useNavigate, useParams } from "react-router-dom";

function GardenSuccess() {
  const { gardenId } = useParams();
  const navigate = useNavigate();

  const handleNavigateDashboard = () => {
    navigate("/dashboard"); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigatePlantSearch = () => {
    navigate(`/plant-search/${gardenId}`); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigateGardenDetails = () => {
    navigate(`/garden-details/${gardenId}`); // Make sure this path matches your route for ExampleOne
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1 className="garden-heading">You've Successfully Created a Garden!</h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "30px" }}>
      <button className="garden-button" onClick={handleNavigatePlantSearch}>FIND PLANTS</button>
      <button className="garden-button" onClick={handleNavigateGardenDetails}>GO TO GARDEN</button>
      <button className="garden-button" onClick={handleNavigateDashboard}>GO TO DASHBOARD</button>
      </div>
    </div>
  );
}


export default GardenSuccess;
