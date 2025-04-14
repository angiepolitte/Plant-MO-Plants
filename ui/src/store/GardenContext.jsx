import React, { createContext, useState } from 'react';

export const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const [gardenData, setGardenData] = useState({
    gardenName: '',
    gardenZone: '',
    gardenLight: '',
    gardenWater: '',
    gardenSoil: '',
    id: null, // if saving after page 1
  });

  return (
    <GardenContext.Provider value={{ gardenData, setGardenData }}>
      {children}
    </GardenContext.Provider>
  );
};