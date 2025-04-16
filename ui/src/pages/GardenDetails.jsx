import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import PlantCard from './PlantCard';
// import './GardenDetailPage.css';


function GardenDetails() {
  const { gardenId } = useParams();
  const [garden, setGarden] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');



  const navigate = useNavigate();

  const handleNavigateDashboard= () => {
    navigate('/dashboard'); // Make sure this path matches your route for ExampleOne
  };

  const token = localStorage.getItem("JWT_TOKEN");
  const csrfToken = localStorage.getItem("CSRF_TOKEN");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/garden/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/garden/garden-details/${gardenId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setGarden(data);
        setNewName(data.name);
      });
  }, [gardenId]);

  const handleNameSave = () => {
    fetch(`http://localhost:8080/api/garden/garden-details/${gardenId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gardenName: newName }) 
    })
      .then((response) => response.json())
      .then((updated) => {
        setGarden(updated);
        setEditMode(false);
      });
  };

  if (!garden) return <div>Loading garden...</div>;

  return (
    <div className="garden-detail-page">
      <div className="header">
        {editMode ? (
          <div>
            <input
              value={newName}
              onChange={(e) => setNewGardenName(e.target.value)}
            />
            <button onClick={handleNameSave}>Save</button>
          </div>
        ) : (
          <h1>
            {garden.name}{' '}
            <button onClick={() => setEditMode(true)}>Edit</button>
          </h1>
        )}
      </div>

      <div className="garden-main">
        <img
          src={garden.imageUrl || '/default-garden.jpg'}
          alt="Garden"
          className="garden-image"
        />
        <div className="conditions-box">
          <h3>Garden Conditions</h3>
          <p><strong>Water:</strong> {garden.gardenWater}</p>
          <p><strong>Soil:</strong> {garden.gardenSoil}</p>
          <p><strong>Light:</strong> {garden.gardenLight}</p>
          <a href={`/print/${garden.id}`} target="_blank" rel="noreferrer">🖨️ Print Garden Plan</a>
          <br />
          <a href="https://www.google.com/maps/search/plant+nursery+near+me" target="_blank" rel="noreferrer">🪴 Find a Nursery</a>
        </div>
      </div>

      <div className="plant-section">
        <h2>Plants in Your Garden</h2>
        {garden.plants.length > 0 ? (
          <div className="plant-list">
            {garden.plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <p>No plants yet. <a href={`/add-plants/${garden.id}`}>Add some plants 🌱</a></p>
        )}
      </div>
    </div>
  );
}

export default GardenDetails;