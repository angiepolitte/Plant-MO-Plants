import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get dynamic params from the route
import { useMyContext } from "../store/ContextApi";

// PhotoFetching Component to fetch and display photos by gardenId and userId
const PhotoFetching = ({ gardenId, userId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the photos from the backend API
  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/photo/garden/${gardenId}/user/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setPhotos(data); // Assuming the response is a list of Photo objects
      } else {
        setError("Failed to fetch photos.");
      }
    } catch (err) {
      setError("Error fetching photos.");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the photos when the component mounts or when gardenId/userId change
  useEffect(() => {
    if (gardenId && userId) {
      fetchPhotos();
    }
  }, [gardenId, userId]);

  return (
    <div>
      {loading && <p>Loading photos...</p>}
      {error && <p>{error}</p>}
      {photos.length === 0 && !loading && <p>No photos available.</p>}
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <h3>{photo.photoName}</h3>
            <img
              src={`data:image/jpeg;base64,${photo.photoImage}`} // assuming the image is base64 encoded
              alt={photo.photoName}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFetching;
