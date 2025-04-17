import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const PhotoFetching = ({ userId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(`http://localhost:8080/api/photo/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
        if (data.length > 0) {
          setPhotos(data);
          setFeaturedPhoto(data[0]); // pick first as default
        }
        // if (data.length > 0) setFeaturedPhoto(data[0]);
      } else {
        setError("Failed to fetch photos.");
      }
    } catch (err) {
      setError("Error fetching photos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // *****************  DELETE PHOTO  done in the fetch so you can view the photos you are wanting to edit/delete

  const deletePhoto = async (photoId) => {
    const token = localStorage.getItem("JWT_TOKEN");
    const csrfToken = localStorage.getItem("CSRF_TOKEN");

    try {
      const response = await fetch(
        `http://localhost:8080/api/photo/delete/${photoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo.id !== photoId)
        );
      } else {
        console.error("Failed to delete photo.");
      }
    } catch (err) {
      console.error("Error deleting photo", err);
    }
  };

  //**************** UPDATE PHOTO Will APPLY TO GARDEN DETAILS */
  const updatePhoto = async (photoId, newName) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/photo/${photoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ photoName: newName }),
        }
      );

      if (response.ok) {
        fetchPhotos(); // refresh photo list
      } else {
        console.error("Failed to update photo");
      }
    } catch (err) {
      console.error("Error updating photo", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPhotos();
    }
  }, [userId]);

  const otherPhotos = photos.filter((photo) => photo.id !== featuredPhoto?.id);

  if (loading) return <p>Loading photos...</p>;
  if (error) return <p>{error}</p>;
  if (photos.length === 0) return <p>No photos available.</p>;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Featured Photo Section */}
        {featuredPhoto && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/garden-details/${featuredPhoto.garden.id}`, {
                state: { photo: featuredPhoto },
              })
            }
          >
            <img
              src={`data:image/jpeg;base64,${featuredPhoto.photoImage}`}
              alt={featuredPhoto.photoName}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
                display: "block",
              }}
            />
            {/* <Typography variant="h6" align="center" sx={{ mt: 1 }}>
            {featuredPhoto.photoName}
          </Typography> */}
          </div>
        )}

        {/* Other Photos Section */}
        <Grid container spacing={2}>
          {otherPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{ cursor: "pointer", marginBottom: "1rem" }}
              onClick={() =>
                navigate(`/garden-details/${photo.garden.id}`, {
                  state: { photo: photo },
                })
              }
            >
              <img
                src={`data:image/jpeg;base64,${photo.photoImage}`}
                alt={photo.photoName}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
              {/* <p>{photo.photoName}</p> */}
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default PhotoFetching;
