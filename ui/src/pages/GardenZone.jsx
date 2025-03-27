import { useNavigate } from 'react-router-dom';

function GardenZone() {
    const navigate = useNavigate();

  const handleNavigateGardenConditions= () => {
    navigate('/garden-conditions'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Garden Zone</h1>
      <h2>and move on to conditions</h2>
      <button onClick={handleNavigateGardenConditions}>Garden Conditions</button>
    </div>
  );
}

export default GardenZone;