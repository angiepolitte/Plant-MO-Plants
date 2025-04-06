import React from 'react';
import { useLocation } from 'react-router-dom';

function NurseryList() {
  const location = useLocation();
  const nurseries = location.state?.nurseries || []; //Accesses the data from API

  if (!nurseries || nurseries.length === 0) {
    return <p>No nurseries found.</p>
  }

  return (
    <div>
      <h2>My Local Nurseries</h2>
      <ul style={{ padding: 0, listStyleType: 'none' }}>
        {nurseries.map((nursery) => (
          <li key={nursery.place_id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
          <div>
            <strong>{nursery.name}</strong>
            <p>{nursery.formatted_address}</p>
            <a 
              href={`https://www.google.com/maps/place/?q=place_id:${nursery.place_id}`}
              target="_blank" // opens new tab
              rel="noopener noreferrer" // security in not relating anything back to the original page where it was opened from
            >
              View on Google Maps
            </a>
          </div>
          </li>
        ))}
      </ul> 
    </div>
  );
}         

export default NurseryList;