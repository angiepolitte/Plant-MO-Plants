import { useState } from "react";

const PhotoUpload = ({ userId: defaultUserId, gardenId: defaultGardenId }) => {
    const [file, setFile] = useState(null);
    const [photoName, setPhotoName] = useState("");
    const [gardenId, setGardenId] = useState(defaultGardenId || "");
    const [userId, setUserId] = useState(defaultUserId || "");
    const [photos, setPhotos] = useState([]);

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

            {/* Only show these inputs if props are not passed */}
            {!defaultGardenId && (
                <input 
                    type="number" 
                    placeholder="Garden ID" 
                    value={gardenId} 
                    onChange={(e) => setGardenId(e.target.value)} 
                />
            )}
            {!defaultUserId && (
                <input 
                    type="number" 
                    placeholder="User ID" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
            )}

            <button onClick={handleUpload}>Upload</button>
          
        </div>
    );
};

export default PhotoUpload;

