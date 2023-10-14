import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState("");

  return (
    <GlobalContext.Provider
      value={{ cards, setCards, selectedCategory, setSelectedcategory }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
