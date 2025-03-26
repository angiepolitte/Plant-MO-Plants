import { useNavigate } from 'react-router-dom';

function GardenConditions() {
  const navigate = useNavigate();

  const handleNavigatePlantSearch= () => {
    navigate('/plantsTBD'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Garden Conditions</h1>
      <h2>and move on to plant results/search</h2>
      <button onClick={handleNavigatePlantSearch}>Plant Results/Search</button>
    </div>
  );
}

export default GardenConditions;