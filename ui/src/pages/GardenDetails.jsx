import { useNavigate } from 'react-router-dom';

function GardenDetails() {
  const navigate = useNavigate();

  const handleNavigateDashboard= () => {
    navigate('/dashboard'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Garden Details Pge</h1>
      <h2>and move on to Dashboard</h2>
      <button onClick={handleNavigateDashboard}>Garden Conditions</button>
    </div>
  );
}

export default GardenDetails;