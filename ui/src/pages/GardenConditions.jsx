import { useNavigate } from 'react-router-dom';

function GardenConditions() {
  const navigate = useNavigate();

  const handleNavigateGardenSuccess= () => {
    navigate('/garden-success'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Garden Conditions</h1>
      <h2>and move on to Garden Success Page</h2>
      <button onClick={handleNavigateGardenSuccess}>Go to Success Page</button>
    </div>
  );
}

export default GardenConditions;