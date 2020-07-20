import React, { useState, createContext } from "react";

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [userName, setUserName] = useState("No user");

  return (
    <CustomerContext.Provider value={{ setUserName, userName }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
export { CustomerProvider };
