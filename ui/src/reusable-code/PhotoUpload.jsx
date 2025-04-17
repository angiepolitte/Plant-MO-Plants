import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../custom-css/Dashboard.css";

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [gardenId, setGardenId] = useState("");
  const [gardens, setGardens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    const csrfToken = localStorage.getItem("CSRF_TOKEN");

    fetch("http://localhost:8080/api/photo/gardens-without-photo/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setGardens(data))
      .catch((err) => console.error("Failed to fetch gardens", err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("handleUpload called"); // Add this line
    if (!file || !photoName || !gardenId) {
      alert("All fields are required!");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("photoName", photoName);
    formData.append("gardenId", gardenId);

    console.log("FormData created:", formData); // Add this line
    for (const value of formData.values()) {
      console.log("FormData Value:", value); // Add this line
    }
    for (const key of formData.keys()) {
      console.log("FormData Key:", key); // Add this line
    }

    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");
      console.log("Token:", token); // Add this line
      console.log("CSRF Token:", csrfToken); // Add this line

      const response = await fetch("http://localhost:8080/api/photo/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          Accept: "application/json", // Keep this for the expected response type
        },
        credentials: "include",
        body: formData,
      });

      console.log("Response:", response); // Add this line

      if (response.ok) {
        const uploadedPhotoData = await response.json();
        console.log("Upload successful, response data:", uploadedPhotoData);
        setFile(null);
        setPhotoName("");
        return uploadedPhotoData.garden.id; // Assuming your backend returns the garden object within the uploadedPhotoData
      } else {
        const errorData = await response.json(); // Try to get error details from the backend
        console.error(
          "Failed to upload photo. Status:",
          response.status,
          "Error Data:",
          errorData
        );
        alert("Failed to upload photo.");
        return false;
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      return false;
    }
  };

  return (
    <div className="dashboard-wrapper center">
      <div className="card photo-upload-card">
        <div className="upload-content">
          <h2 className="personalize-label">Upload a Garden Photo</h2>
          <p style={{ color: "#4F6F52", fontSize: "1rem" }}>
            Add a beautiful moment to your garden 🌿
          </p>

          <form
            className="photo-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const uploadedGardenId = await handleUpload(); // Get the returned gardenId
              if (uploadedGardenId) {
                navigate(`/garden-details/${uploadedGardenId}`, {
                  state: { photoUploaded: true },
                });
              }
            }}
          >
            <label className="form-label">Select Photo:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-input"
            />

            <label className="form-label">Photo Name:</label>
            <input
              type="text"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              className="form-input"
              placeholder="e.g., Spring Blooms"
            />

            <label className="form-label">Select Garden:</label>
            <select
              value={gardenId}
              onChange={(e) => setGardenId(e.target.value)}
              className="form-input"
            >
              <option value="">-- Select Your Garden --</option>
              {gardens.map((garden) => (
                <option key={garden.id} value={garden.id}>
                  {garden.gardenName}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button type="submit" className="dashboard-button">
                Upload
              </button>
              <button
                type="button"
                className="dashboard-button"
                onClick={() => navigate(`/dashboard`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
