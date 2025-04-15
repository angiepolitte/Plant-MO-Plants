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
    navigate("/garden-details"); // Make sure this path matches your route for ExampleOne
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You've Successfully Created a Garden!</h1>
      <button onClick={handleNavigateDashboard}>Go to your Dashboard</button>
      <button onClick={handleNavigatePlantSearch}>
        Add Plants to your Garden
      </button>
      <button onClick={handleNavigateGardenDetails}>
        Go to your Garden Details
      </button>
    </div>
  );
}

export default GardenSuccess;
