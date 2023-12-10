import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const [seletedState, setSelectedState] = useState("");
  const [selectFile, setSelectedFile] = useState("");
  const [hourRate , setHour] = useState("")
  const [chat , setChat] = useState([])
  const [ idType, setIdType  ] = useState(null);
  const [selectedService, setSelectedService] = useState([]);
  const [errandStates, setErrandStates] = useState({
    orderPlaced: "completed",
    wayToPick: "completed",
    wayToDeliver: "completed",
    delivered: "pending",
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOnBoarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isToken , setToken] = useState("")
  const [isComplete , setIsComplete] = useState()
  const [userId , setUserId] = useState()
  const [userType, setUserType] = useState("")
  const [Agent, setAgent] = useState([])
  const [createErrandSent,setCreatErrandSent] = useState([])
  const [receiveErrand,setReceiveErrand] = useState([])
  const [acceptedErrand,setAcceptedErrand] = useState([])
  useEffect(() => {
    if (isNewUser) {
      setIsOnboarded(false);
    } else {
      setIsOnboarded(true);
    }
  }, [isNewUser]);

  const getUserId = async () => {
    // AsyncStorage.removeItem("user_id");
    // AsyncStorage.removeItem("token");
    const user_id = await AsyncStorage.getItem("user_id");
    const userType = await AsyncStorage.getItem("userType");
    const Token = await AsyncStorage.getItem("token");
    setToken(Token)
    setUserType(userType);
    if (user_id !== null) {
      setIsNewUser(false);
      setUserId(user_id)
    } else {
      setIsNewUser(true);
    }
    console.log("asyncStorage:::", user_id);
    console.log("asyncStorage:::", userType);
    console.log("asyncStorage:::", Token);
  };

  useEffect(() => {
    getUserId();
  }, [isNewUser, isAuthenticated, isToken]);

  return (
    <GlobalContext.Provider
      value={{
        userId , 
        setUserId,
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
        userType,
        setUserType,
        selectedPreference,
        setSelectedPreference,
        seletedState,
        setSelectedState,
        selectedService,
        setSelectedService,
        selectFile, 
        setSelectedFile,
        isToken,
        setToken,
        isComplete, 
        setIsComplete,
        hourRate, 
        setHour,
        Agent,
        setAgent,
        idType, 
        setIdType,
        createErrandSent,
        setCreatErrandSent,
        receiveErrand,
        setReceiveErrand,
        acceptedErrand,
        setAcceptedErrand,
        chat , 
        setChat
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
