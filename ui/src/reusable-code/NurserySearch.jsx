import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NurserySearch() {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError('');
    if (!zipCode) {
      setError('Please enter a zip code.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/nurseries/local?query=nurseries+${zipCode}&radius=8046.72`); // Within a 5 mile radius converted to meters(5x1609.344)~ meters is the standard unit for most services 
      navigate ('/results', { state: { nurseries: response.data.results } });
    } catch (err) {
      console.error('Error fetching nurseries:', err);
      setError('Failed to fetch nurseries. Please try again.');
      navigate('/results', { state: { nurseries: [] } });
    }
  };

  return (
    <div>
      <input 
      type="text"
      placeholder="Enter Zip Code"
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
}

export default NurserySearch;
