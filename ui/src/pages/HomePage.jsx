import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login"); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigateCreateAccount = () => {
    navigate("/create-account"); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigateAdmin = () => {
    navigate("/admin-dashboard"); // Make sure this path matches your route for ExampleOne
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <button onClick={handleNavigateLogin}>SignIn</button>
      <button onClick={handleNavigateCreateAccount}>Create Account</button>
      <button onClick={handleNavigateAdmin}>Admin Dashboard</button>
    </div>
  );
}

export default HomePage;
