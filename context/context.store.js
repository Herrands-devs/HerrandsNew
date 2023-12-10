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
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  const [itemAddress, setItemAddress] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [categoryId, setCategoryId] = useState();
  const [createErrandSent, setCreatErrandSent] = useState(false);
  const [errandRoute, setErrandRoute] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleId, setVehicleId] = useState(null);
  const [rides, setRides] = useState([]);

  // useEffect(() => {
  //   if (isNewUser) {
  //     setIsOnboarded(false);
  //   } else {
  //     setIsOnboarded(true);
  //   }
  // }, [isNewUser]);

  const getUserId = async () => {
    // AsyncStorage.removeItem("user_id");
    const user_id = await AsyncStorage.getItem("user_id");
    if (user_id !== null) {
      setIsNewUser(false);
      console.log("asyncStorage:::", user_id);
    } else {
      setIsNewUser(true);
      console.log("There's no user id:::");
    }
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token !== null) {
      setToken(false);
      setIsAuthenticated(true);
      // console.log("asyncStorage token:::", token);
    } else {
      setToken(true);
      // setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {
    getUserId();
  }, []);

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
        setUserType,
        token,
        setToken,
        itemAddress,
        setItemAddress,
        recipientAddress,
        setRecipientAddress,
        categoryId,
        setCategoryId,
        createErrandSent,
        setCreatErrandSent,
        errandRoute,
        setErrandRoute,
        vehicleType,
        setVehicleType,
        vehicleId,
        setVehicleId,
        rides,
        setRides,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
