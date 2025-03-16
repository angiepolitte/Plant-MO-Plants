import { useNavigate } from 'react-router-dom';

function StarterPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/chocolate-ice-cream'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hello</h1>
      <button onClick={handleNavigate}>Go to Example One</button>
    </div>
  );
}

export default StarterPage;