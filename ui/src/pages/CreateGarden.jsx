import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useMyContext } from "../store/ContextApi";

function CreateGarden() {
  const navigate = useNavigate();
  const [gardenName, setGardenName] = useState('');
  const { currentUser } = useMyContext();
  const userId = currentUser?.id;

  // const handleNavigateGardenZone= () => {
  //   navigate('/garden-zone'); // Make sure this path matches your route for ExampleOne
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    try {
    // Send the garden name and user ID to the backend to create a new garden
      const response = await axios.post(`http://localhost:8080/garden/create/${userId}`, {
      gardenName,
      });

      if (response.status === 201) {
      // Navigate to the next step (garden zone)
        navigate('/garden-zone');
      } else {
        console.error("Failed to create garden.");
      }
    } catch (error) {
      console.error("Error creating garden", error);
    }
  };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Enter Name of Garden</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={gardenName}
          onChange={(e) => setGardenName(e.target.value)}
          placeholder="Enter Garden Name"
          required
        />
        <button type="submit">Create Garden</button>
      </form>
    </div>
  );
}

export default CreateGarden;

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Enter Name of Garden</h1>
//       <button onClick={handleNavigateGardenZone}>Garden Zone</button>
//     </div>
//   );
// }

// export default CreateGarden;