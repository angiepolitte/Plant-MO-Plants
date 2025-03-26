import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();

  const handleNavigateCreateGarden = () => {
    navigate('/create-garden'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Create Account Logic</h1>
      <h2>and move on to Create Garden</h2>
      <button onClick={handleNavigateCreateGarden}>Submit and Create Garden</button>
    </div>
  );
}

export default CreateAccount;