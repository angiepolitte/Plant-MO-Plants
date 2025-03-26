import { useNavigate } from 'react-router-dom';

function PlantsTBD() {
  const navigate = useNavigate();

  const handleNavigateGardenDetails= () => {
    navigate('/garden-details'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Plant Results</h1>
      <h2>and move on to garden details</h2>
      <button onClick={handleNavigateGardenDetails}>Go to Garden Details</button>
    </div>
  );
}

export default PlantsTBD;