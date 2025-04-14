import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Forecast from "../reusable-code/FiveDayForecast";
import PhotoFetching from "../reusable-code/PhotoFetching";
import NurserySearch from "../reusable-code/NurserySearch";
import { useMyContext } from "../store/ContextApi";

import "../custom-css/Dashboard.css"; // Create this for layout styles

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useMyContext();
  const userId = currentUser?.id;
  const username = currentUser?.username;
  const { zipCode, updateZipCode } = useMyContext();
  const [inputZip, setInputZip] = useState("");

  const handleSubmit = () => {
    const trimmedZip = inputZip.trim();
    if (/^\d{5}$/.test(trimmedZip)) {
      updateZipCode(trimmedZip);
    } else {
      alert("Invalid ZIP code format.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="personalize-container">
        <label htmlFor="zip" className="personalize-label">
          Let's personalize your Dashboard! Enter your ZIP code:
        </label>
        <div>
          <input
            type="text"
            id="zip"
            value={inputZip}
            onChange={(e) => setInputZip(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 90210"
            className="dashboard-form"
          />

          <button className="garden-button" onClick={handleSubmit}>
            Personalize!
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Left Section */}
        <div className="dashboard-left">
          <div className="card garden-card">
            <h2>{username}'s Gardens</h2>
            <div className="card-content">
              <PhotoFetching userId={userId} />
            </div>
          </div>

          <div className="personalize-container">
            <button
              className="dashboard-button"
              onClick={() => navigate("/photo-upload")}
            >
              Upload a Photo of your Garden!
            </button>
            <button
              className="dashboard-button"
              onClick={() => navigate("/create-garden")}
            >
              Create New Garden
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="dashboard-right">
          <div className="card">
            <div className="card-content center">
              <Forecast />
            </div>
          </div>

          <div className="card nursery-card">
            <div className="card-content">
              <h2>Nurseries in Your Area</h2>
              <div className="nursery-scroll">
                <NurserySearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import { useState, useEffect } from "react";
// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   Box,
// } from "@mui/material";
// import Forecast from "../reusable-code/FiveDayForecast";
// import { Button } from "@mui/material";
// import PhotoFetching from "../reusable-code/PhotoFetching";
// import { useMyContext } from "../store/ContextApi";
// import NurserySearch from "../reusable-code/NurserySearch";
// import "../custom-css/PlantSearch.css";
// import "../custom-css/GardenCard.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useMyContext();
//   const userId = currentUser?.id;
//   const username = currentUser?.username;
//   const { zipCode, updateZipCode } = useMyContext();
//   const [inputZip, setInputZip] = useState("");

//   const handleSubmit = () => {
//     const trimmedZip = inputZip.trim();
//     if (/^\d{5}$/.test(trimmedZip)) {
//       updateZipCode(trimmedZip); // only now update context
//     } else {
//       alert("Invalid ZIP code format.");
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };

//   return (
//     <div>
//       <div className="personalize-container">
//         <label htmlFor="zip" className="personalize-label">
//           Let's personalize your Dashboard! Enter your ZIP code:
//         </label>
//         <div>
//           <input
//             type="text"
//             id="zip"
//             value={inputZip}
//             onChange={(e) => setInputZip(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="e.g. 90210"
//             className="gardenForm"
//           />

//           <button className="garden-button" onClick={handleSubmit}>
//             Personalize!
//           </button>
//         </div>
//       </div>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center", // Center content vertically
//           alignItems: "flex-start", // Center content horizontally
//           padding: "2rem",
//           gap: "2rem",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Left: Garden Section */}

//         <Box xs={{ width: 500 }}>
//           <Card
//             sx={{
//               height: 600,
//               width: 500,
//               overflowY: "auto",

//               backgroundColor: "#F3E5F5",
//             }}
//           >
//             <Typography variant="h6" paddingTop={"1rem"}>
//               {username}'s Gardens
//             </Typography>
//             <CardContent
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//               }}
//             >
//               <PhotoFetching userId={userId} />
//             </CardContent>
//           </Card>

//           {/* Upload Photo and Create New Garden Button */}

//           <Box className="personalize-container" paddingTop={"2rem"}>
//             <button
//               className="dashboard-button"
//               onClick={() => navigate("/photo-upload")}
//             >
//               Upload a Photo of your Garden!
//             </button>

//             <button
//               className="dashboard-button"
//               paddingTop={"2rem"}
//               onClick={() => navigate("/create-garden")}
//             >
//               Create New Garden
//             </button>
//           </Box>
//         </Box>

//         {/* Right: Weather & Nurseries Section */}
//         <Grid item xs={12} md={6}>
//           {/* Weather Forecast */}
//           <Card
//             sx={{
//               minHeight: 300,
//               backgroundColor: "#F3E5F5",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 1,
//             }}
//           >
//             <CardContent>
//               <Forecast />
//             </CardContent>
//           </Card>

//           {/* Nurseries Section */}
//           <Card
//             sx={{
//               minHeight: 300,
//               maxHeight: 400,
//               backgroundColor: "#F3E5F5",
//               mt: 2,
//             }}
//           >
//             <CardContent
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <Typography variant="h6" mb={1}>
//                 Nurseries in Your Area
//               </Typography>

//               {/* Scrollable wrapper */}
//               <Box sx={{ overflowY: "auto", flexGrow: 1, maxHeight: 300 }}>
//                 <NurserySearch />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default Dashboard;
