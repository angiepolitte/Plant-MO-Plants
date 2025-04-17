import React, { useState, useEffect } from "react";

const GardenPhoto = ({ gardenId }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardenPhoto = async () => {
      setLoading(true);
      setError(null);
      setPhoto(null);

      try {
        const token = localStorage.getItem("JWT_TOKEN");
        const csrfToken = localStorage.getItem("CSRF_TOKEN");

        const response = await fetch(
          `http://localhost:8080/api/photo/garden/${gardenId}/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-XSRF-TOKEN": csrfToken,
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming the endpoint returns a list of photos, we'll take the first one.
          // You might need to adjust this logic if you expect multiple photos.
          if (data && data.length > 0) {
            setPhoto(data[0]);
          } else {
            // Handle the case where no photo is found for this garden
            setPhoto(null);
          }
        } else if (response.status === 404) {
          setPhoto(null);
        } else {
          setError("Failed to fetch garden photo.");
          console.error("Failed to fetch garden photo:", response);
        }
      } catch (err) {
        setError("Error fetching garden photo.");
        console.error("Error fetching garden photo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (gardenId) {
      fetchGardenPhoto();
    }
  }, [gardenId]);

  if (loading) return <p>Loading garden photo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {photo ? (
        <img
          src={`data:image/jpeg;base64,${photo.photoImage}`}
          alt={photo.photoName}
          style={{
            width: "800px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <div
          style={{
            width: "800px",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            border: "2px dashed #ccc",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          No photo has been uploaded for this garden yet.
        </div>
      )}
    </>
  );
};

export default GardenPhoto;
