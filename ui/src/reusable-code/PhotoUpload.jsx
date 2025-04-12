import { useEffect, useState } from "react";
import { useMyContext } from "../store/ContextApi";
import { useNavigate } from "react-router-dom";

const PhotoUpload = ({ userId: defaultUserId, gardenId: defaultGardenId }) => {
  const { currentUser } = useMyContext();
  const [file, setFile] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [gardenId, setGardenId] = useState("");
  const [gardens, setGardens] = useState([]);

  const userId = currentUser?.id;
  const username = currentUser?.username;

  console.log("currentUser:", currentUser);
  const navigate = useNavigate();
  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  // ***** FETCHING GARDENS PER USERID *****
  useEffect(() => {
    if (currentUser?.id) {
      fetch(`http://localhost:8080/photo/gardens/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched gardens:", data);
          setGardens(data);
        })
        .catch((err) => console.error("Failed to fetch gardens", err));
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !photoName || !gardenId || !userId) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("photoName", photoName);
    formData.append("gardenId", gardenId);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:8080/photo/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photo uploaded successfully!");
        setFile(null);
        setPhotoName("");
        setGardenId("");
      } else {
        alert("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Photo Name"
        value={photoName}
        onChange={(e) => setPhotoName(e.target.value)}
      />
      <select value={gardenId} onChange={(e) => setGardenId(e.target.value)}>
        <option value="">-- Select Your Garden --</option>
        {Array.isArray(gardens) &&
          gardens.map((garden) => (
            <option key={garden.id} value={garden.id}>
              {garden.gardenName}
            </option>
          ))}
      </select>

      <button
        onClick={() => {
          handleUpload();
          handleNavigateToDashboard();
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default PhotoUpload;
