import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  
  return (
    <GlobalContext.Provider value={{ cards, setCards }}>
      {children}
    </GlobalContext.Provider>
  );
};
