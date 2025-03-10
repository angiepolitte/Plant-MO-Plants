import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';

function ExampleOne() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [comment, setComment] = useState(""); // Store a single comment instead of an array

  // Fetch test comment (GET)
  useEffect(() => {
    fetch("http://localhost:8080/api/example-one")
      .then((response) => response.text()) // Expecting a single string, so use .text()
      .then((data) => setComment(data)) // Store the single comment
      .catch((error) => console.error("Error fetching comment:", error));
  }, []);

  const handleNavigate = () => {
    navigate('/example-two'); // Navigate to ExampleTwo page
  };

  return (
    <div>
      <h2>Example One</h2>
      <p>{comment}</p> {/* Display the single comment */}
      
      {/* Button to navigate to ExampleTwo */}
      <button onClick={handleNavigate}>Go to Example Two</button>
    </div>
  );
}

export default ExampleOne;

