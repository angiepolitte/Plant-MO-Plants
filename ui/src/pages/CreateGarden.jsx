import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMyContext } from "../store/ContextApi";
import api from '../services/api';
import { GardenContext } from '../store/GardenContext';
import axios from 'axios';

function CreateGarden() {
  const navigate = useNavigate();
  const { gardenData, setGardenData } = useContext(GardenContext);

  const handleChange = (e) => {
    setGardenData({ ...gardenData, gardenName: e.target.value });
  };

  const handleNext = async () => {;
    navigate("/garden-zone");
    }
    // move to next page
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Enter Name of Garden</h1>
      <input value={gardenData.gardenName} onChange={handleChange} />
      <button onClick={handleNext}>Next</button>
  </div>
);
}

  // const { currentUser } = useMyContext();
  // const userId = currentUser?.id;

  // const handleNavigateGardenZone= () => {
  //   navigate('/garden-zone'); // Make sure this path matches your route for ExampleOne
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    // const token = localStorage.getItem("JWT_TOKEN");
    // const csrfToken = localStorage.getItem("CSRF_TOKEN");
  
    // if (!userId) {
    //   console.error("User is not logged in.");
    //   return;
    // }

    // try {
    // // Send the garden name and user ID to the backend to create a new garden
    //   const response = await api.post(`/garden/create/${userId}`, 
    //     { gardenName, }
      //   {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "X-XSRF-TOKEN": csrfToken,
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   credentials: "include", 
    //   // }
    // );

      // if (response.status === 201) {
      // Navigate to the next step (garden zone)
//         navigate('/garden-zone');
//       } else {
//         console.error("Failed to create garden.");
//       }
//     } catch (error) {
//       console.error("Error creating garden", error);
//       if (error.response) {
//         console.error("Backend response:", error.response.data);
//     }
//   };
  
  //   return (
  //     <div style={{ textAlign: 'center', marginTop: '50px' }}>
  //       <h1>Enter Name of Garden</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         value={gardenName}
  //         onChange={(e) => setGardenName(e.target.value)}
  //         placeholder="Enter Garden Name"
  //         required
  //       />
  //       <button type="submit">Create Garden</button>
  //     </form>
  //   </div>
  // );
// }

export default CreateGarden;

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Enter Name of Garden</h1>
//       <button onClick={handleNavigateGardenZone}>Garden Zone</button>
//     </div>
//   );
// }

// export default CreateGarden;