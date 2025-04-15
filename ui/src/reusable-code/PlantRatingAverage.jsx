import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function PlantRatingAverage() {
  const { plantId } = useParams();
  const [ratingAverage, setRatingAverage] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function fetchAverageRating() {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/plant-rating/${plantId}/average-rating`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const ratingData = await response.json();

      if (!ignore) {
        setRatingAverage(ratingData.averageRating);
      }
    }
    fetchAverageRating();
    return () => {
      ignore = true;
    };
  }, [plantId]);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <FaStar
            key={i}
            className="star"
            color={ratingValue <= ratingAverage ? "#BA68C8" : "#D7CCC8"}
            size={20}
          ></FaStar>
        );
      })}
    </div>
  );
}
export default PlantRatingAverage;
