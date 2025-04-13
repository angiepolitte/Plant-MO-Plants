import React, { useState } from "react";
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
import { useMyContext } from "../store/ContextApi";
import { useEffect } from "react";

const Forecast = () => {
  const { zipCode } = useMyContext();
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  // const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (zipCode) {
      getForecast();
    }
  }, [zipCode]);

  const getForecast = async () => {
    if (!zipCode) {
      alert("No ZIP code available.");
      return;
    }

    try {
      let url;
      console.log("zipCode from context:", zipCode);
      if (/^\d{5}$/.test(zipCode)) {
        url = `http://localhost:8080/weather/forecast/zip?zip=${zipCode}`;
      } else {
        alert("Invalid ZIP code format.");
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== "200") {
        alert("Location not found. Please enter a valid ZIP code.");
        return;
      }
      const cityName = data.city.name;
      setCity(data.city.name); //  gets the city name

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

        // Only process the data once per day (e.g., 12:00 PM)
        if (!seenDates.has(formattedDate)) {
          seenDates.add(formattedDate);

          // Get the temperatures and find the max and min
          const tempsForTheDay = data.list
            .filter((forecast) => {
              const forecastDate = new Date(
                forecast.dt * 1000
              ).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return forecastDate === formattedDate;
            })
            .map((forecast) => forecast.main.temp);

          const tempHigh = Math.max(...tempsForTheDay);
          const tempLow = Math.min(...tempsForTheDay);

          dailyForecast.push({
            date: formattedDate,
            tempHigh: tempHigh !== undefined ? Math.round(tempHigh) : "N/A",
            tempLow: tempLow !== undefined ? Math.round(tempLow) : "N/A",
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Check if the pressed key is 'Enter'
      getForecast();
    }
  };
  //rendering from open-weather-values to material ui values
  const renderIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <SunnyIcon sx={{ color: "yellow" }} />;
      case "clouds":
        return <CloudyIcon sx={{ color: "white" }} />;
      case "rain":
        return <RainyIcon sx={{ color: "#1E88E5" }} />;
      case "drizzle":
        return <UmbrellaIcon sx={{ color: "gray" }} />;
      case "thunderstorm":
        return <LightningIcon sx={{ color: "yellow" }} />;
      case "snow":
        return <SnowyIcon sx={{ color: "white" }} />;
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
      <h3>Extended Forecast for {city}</h3>
      {forecastData.length > 0}
      {forecastData.length > 0 && (
        <div className={styles.forecastList}>
          {forecastData.map((item, index) => (
            <div key={index} className={styles.forecastItem}>
              <span className={styles.date}>{item.date}</span>
              {renderIcon(item.icon)}{" "}
              {/* Render the correct icon based on weather */}
              <span className={styles.tempHigh}>{item.tempHigh}°F</span>
              <span className={styles.tempLow}>{item.tempLow}°F</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Forecast;
