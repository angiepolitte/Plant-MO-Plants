import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login"); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigateCreateAccount = () => {
    navigate("/signup"); // Make sure this path matches your route for ExampleOne
  };
  const handleNavigateAdmin = () => {
    navigate("/admin-dashboard"); // Make sure this path matches your route for ExampleOne
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#808000", padding: "10px" }}>
        Welcome to our Navtive Planter App
      </h1>
      <h2 style={{ color: "#FF7F50", padding: "20px", fontSize: "35px" }}>
        Plan your Missouri native plant garden
      </h2>
      <button onClick={handleNavigateLogin}>SignIn</button>
      <button onClick={handleNavigateCreateAccount}>Create Account</button>
      <button onClick={handleNavigateAdmin}>Admin Dashboard</button>
    </div>
  );
}

export default HomePage;
