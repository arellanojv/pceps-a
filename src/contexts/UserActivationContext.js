import React, { createContext, useState, useContext } from "react";

const UserActivationContext = createContext();

export const DataProvider = ({ children }) => {  
  const [data, setData] = useState({});

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <UserActivationContext.Provider value={{ data, setValues }}>
      {children}
    </UserActivationContext.Provider>
  );
};

export const useData = () => useContext(UserActivationContext) 