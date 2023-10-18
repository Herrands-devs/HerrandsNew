import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState("");
  const [errandStates, setErrandStates] = useState({
    orderPlaced: "completed",
    wayToPick: "completed",
    wayToDeliver: "completed",
    delivered: "pending",
  });

  return (
    <GlobalContext.Provider
      value={{
        cards,
        setCards,
        selectedCategory,
        setSelectedcategory,
        errandStates,
        setErrandStates,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
