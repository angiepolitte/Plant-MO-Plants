import React, { useState, useEffect } from "react";
import styles from "./Forecast.module.css";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudyIcon from "@mui/icons-material/CloudQueue";
import SunnyIcon from "@mui/icons-material/WbSunny";
import RainyIcon from "@mui/icons-material/Grain";
import SnowyIcon from "@mui/icons-material/AcUnit";
import WindIcon from "@mui/icons-material/Waves";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import LightningIcon from "@mui/icons-material/FlashOn";
import FogIcon from "@mui/icons-material/InvertColors";
import HailIcon from "@mui/icons-material/AcUnit";


const Forecast = ({ zip }) => {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (zip) {
      getForecast(zip);
    }
  }, [zip]);  // Trigger the fetch when zipCode changes

 
  const getForecast = async () => {
    if (!zip) {
      alert("Please enter a city name or zip code");
      return;
    }
    
    try {
      let url = `http://localhost:8080/weather/forecast/zip?zip=${zip}`;
      // let url;
      // if (/^\d{5}$/.test(city)) {  // Checks if input is a 5-digit zip code
      //   url = `http://localhost:8080/weather/forecast/zip?zip=${zip}`;
      // } else {
      //   url = `http://localhost:8080/weather/forecast?city=${city}`;
      // }
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod !== "200") {
        alert("Location not found. Please enter a valid city name or ZIP code.");
        return;
      }
  
      setCity(data.city.name); // Now gets the city name
  
      // Process forecast data...
      const dailyForecast = [];
      const seenDates = new Set();
  
      data.list.forEach((item) => {
        const dateObj = new Date(item.dt * 1000);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
  
        if (!seenDates.has(formattedDate) && item.dt_txt.includes("12:00:00")) {
          seenDates.add(formattedDate);
          dailyForecast.push({
            date: formattedDate,
            tempHigh: Math.round(item.main.temp_max),
            tempLow: Math.round(item.main.temp_min),
            icon: item.weather[0].main.toLowerCase(),
            description: item.weather[0].description,
          });
        }
      });
  
      setForecastData(dailyForecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please try again.");
    }
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {  // Check if the pressed key is 'Enter'
  //     getForecast();
  //   }
  // };
//rendering from open-weather-values to material ui values
  const renderIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <SunnyIcon sx={{ color: 'yellow' }}/>;
      case "clouds":
        return <CloudyIcon />;
      case "rain":
        return <RainyIcon sx={{ color: '#1E88E5'}}/>;
      case "drizzle":
        return <UmbrellaIcon sx= {{ color:'gray' }}/>;
      case "thunderstorm":
        return <LightningIcon />;
      case "snow":
        return <SnowyIcon />;
      case "mist":
      case "fog":
      case "smoke":
      case "haze":
      case "dust":
      case "sand":
      case "ash":
        return <FogIcon />;
      case "squall":
      case "tornado":
        return <WindIcon />;
      default:
        return <CloudIcon />; // fallback
    }
  };
  
  
  return (
    <div className={styles.forecastContainer}>
      <h3>5-Day Forecast</h3>
      {forecastData.length > 0 && <h4 className={styles.cityName}>{city}</h4>}
      {forecastData.length > 0 && (
        <div className={styles.forecastList}>
          {forecastData.map((item, index) => (
            <div key={index} className={styles.forecastItem}>
              <span className={styles.date}>{item.date}</span>
              {renderIcon(item.icon)} {/* Render the correct icon based on weather */}
              <span className={styles.tempHigh}>{item.tempHigh}°F</span>
              <span className={styles.tempLow}>{item.tempLow}°F</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

//   return (
//     <div className={styles.forecastContainer}>
//       <h3>5-Day Forecast</h3>
//       {/* Display city name if forecastData exists */}
//       {forecastData.length > 0 && <h4 className={styles.cityName}>{city}</h4>}
//       {/* <input
//         type="text"
//         placeholder="Enter city"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       <button className={styles.searchButton} onClick={getForecast}>Get Forecast</button> */}

// {forecastData.length > 0 && (
//         <div className={styles.forecastList}>
//           {forecastData.map((item, index) => (
//             <div key={index} className={styles.forecastItem}>
//               <span className={styles.date}>{item.date}</span>
//               <img
//                 src={`https://openweathermap.org/img/wn/${item.icon}.png`}
//                 alt={item.description}
//                 className={styles.forecastIcon}
//               />
//               <span className={styles.tempHigh}>{item.tempHigh}°F</span>
//               <span className={styles.tempLow}>{item.tempLow}°F</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default Forecast;