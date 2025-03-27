import { useNavigate } from 'react-router-dom';

function CreateGarden() {
  const navigate = useNavigate();

  const handleNavigateGardenZone= () => {
    navigate('/garden-zone'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Name of Garden</h1>
      <h2>and move on to Garden Zone</h2>
      <button onClick={handleNavigateGardenZone}>Garden Zone</button>
    </div>
  );
}

export default CreateGarden;