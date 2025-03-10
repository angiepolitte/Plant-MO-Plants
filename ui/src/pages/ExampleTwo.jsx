import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';

function ExampleTwo() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [comment, setComment] = useState(""); // Store a single comment instead of an array

  // Fetch test comment (GET)
  useEffect(() => {
    fetch("http://localhost:8080/api/example-two")
      .then((response) => response.text()) // Expecting a single string, so use .text()
      .then((data) => setComment(data)) // Store the single comment
      .catch((error) => console.error("Error fetching comment:", error));
  }, []);

  const handleNavigate = () => {
    navigate('/'); // Navigate to ExampleTwo page
  };

  return (
    <div>
      <h2>Example Two</h2>
      <p>{comment}</p> {/* Display the single comment */}
      
      {/* Button to navigate to ExampleOne */}
      <button onClick={handleNavigate}>Go to Example One</button>
    </div>
  );
}

export default ExampleTwo;
