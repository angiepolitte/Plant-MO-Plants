import React, { useEffect, useState } from "react";

const GardenPhoto = ({ gardenId }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      if (!token || !csrfToken) {
        console.warn("Missing auth tokens");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/photo/${gardenId}/user`, // Update URL
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
          setPhoto(data); // The response should be the PhotoDTO
        } else {
          setPhoto(null);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        setPhoto(null);
      } finally {
        setLoading(false);
      }
    };

    if (gardenId) {
      fetchPhoto();
    }
  }, [gardenId]);

  if (loading) return <p>Loading photo...</p>;
  if (!photo) return <p>No photo found for this garden.</p>;

  return (
    <div>
      <h4>{photo.photoName}</h4>
      {photo.photoImage ? ( // Assuming 'photoImage' contains the base64 data
        <img
          src={`data:image/jpeg;base64,${photo.photoImage}`}
          alt={photo.photoName}
          width="300"
        />
      ) : (
        <p>Photo data is missing.</p>
      )}
    </div>
  );
};

export default GardenPhoto;
// useEffect(() => {
//   const fetchPhoto = async () => {
//     const token = localStorage.getItem("JWT_TOKEN");
//     const csrfToken = localStorage.getItem("CSRF_TOKEN");

//     if (!token || !csrfToken) {
//       console.warn("Missing auth tokens");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/photo/garden/${gardenId}/user`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-XSRF-TOKEN": csrfToken,
//             Accept: "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setPhoto(data);
//       } else {
//         setPhoto(null);
//       }
//     } catch (error) {
//       console.error("Error fetching photo:", error);
//       setPhoto(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (gardenId) {
//     fetchPhoto();
//   }
// }, [gardenId]);

// if (loading) return <p>Loading photo...</p>;
// if (!photo) return <p>No photo found for this garden.</p>;

// return (
//   <div>
//     <h4>{photo.photoName}</h4>
//     {photo.imageData ? (
//       <img
//         src={`data:image/jpeg;base64,${photo.imageData}`}
//         alt={photo.photoName}
//         width="300"
//       />
//     ) : (
//       <p>Photo data is missing.</p>
//     )}
//   </div>
// );

// export default GardenPhoto;
