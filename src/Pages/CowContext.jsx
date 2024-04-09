import React, { createContext, useState } from 'react';

export const CowContext = createContext();

export const CowProvider = ({ children }) => {
  const [cowData, setCowData] = useState(null);

  return (
    <CowContext.Provider value={{ cowData, setCowData }}>
      {children}
    </CowContext.Provider>
  );
};
