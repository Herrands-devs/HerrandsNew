import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

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
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOnBoarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("")


  useEffect(() => {
    if (isNewUser) {
      setIsOnboarded(false);
    } else {
      setIsOnboarded(true);
    }
  }, [isNewUser]);

  const getUserId = async () => {
    // AsyncStorage.removeItem("user_id");
    const user_id = await AsyncStorage.getItem("user_id");
    if (user_id !== null) {
      setIsNewUser(false);
      console.log("asyncStorage:::", user_id);
    } else {
      setIsNewUser(true);
    }
  };

  useEffect(() => {
    getUserId();
  }, [isNewUser, isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        cards,
        setCards,
        selectedCategory,
        setSelectedcategory,
        errandStates,
        setErrandStates,
        isNewUser,
        setIsNewUser,
        isOnBoarded,
        setIsOnboarded,
        isAuthenticated,
        setIsAuthenticated,
        setUserType
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
