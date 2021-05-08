import React, { createContext, useState, useContext } from 'react';

const PurchaseRequestContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
      <PurchaseRequestContext.Provider value={{ data, setValues }}>
        {children}
      </PurchaseRequestContext.Provider>
  );
};

export const usePurchaseRequest = () => useContext(PurchaseRequestContext);
  