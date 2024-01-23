import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataSelector, storeAuthentication } from "../reducers/dataReducer";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch()

  const {Authentication} = useSelector(DataSelector)
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const [seletedState, setSelectedState] = useState("");
  const [selectFile, setSelectedFile] = useState("");
  const [hourRate, setHour] = useState("");
  const [chat, setChat] = useState([]);
  const [idType, setIdType] = useState(null);
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
  const [isToken, setToken] = useState("");
  const [isComplete, setIsComplete] = useState();
  const [userId, setUserId] = useState();
  const [Agent, setAgent] = useState([]);
  const [receiveErrand, setReceiveErrand] = useState([]);
  const [acceptedErrand, setAcceptedErrand] = useState([]);
  const [userType, setUserType] = useState("");
  const [itemAddress, setItemAddress] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [categoryId, setCategoryId] = useState(1);
  const [createErrandSent, setCreatErrandSent] = useState(false);
  const [errandRoute, setErrandRoute] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleId, setVehicleId] = useState(null);
  const [rides, setRides] = useState([]);
  const [addNote, setAddNote] = useState("");
  const [subTypeId, setSubTypeId] = useState();
  const [errandAccepted, setErrandAccepted] = useState(false);
  const [socketUrl, setSocketUrl] = useState("errand");
  const [message, setMessage] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [rideDetailsModal, setRideDetailsModal] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});
  const [errandId, setErrandId] = useState(null);
  const [isAcceptingErrand , setIsAccepting] = useState(false)

  const [socketRef , setSocket] = useState(null)
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const userType = await AsyncStorage.getItem("userType");
    const Token = await AsyncStorage.getItem("token");
    if (Token) {
      setToken(Token);
      setUserType(userType);
      dispatch(storeAuthentication({
        data : {...Authentication , isBoard : true , isAuth : true , isNew : false, userId : userId , user_type : userType}
      }))
    }
    console.log("Authentication:::", Authentication);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token !== null) {
      setToken(token);
      setIsAuthenticated(true);
      // console.log("asyncStorage token:::", token);
    } else {
      setToken("");
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    getToken();
  }, [isToken]);

  useEffect(() => {
    // AsyncStorage.removeItem("userType")
    getUserId();
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        userId,
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
        chat,
        setChat,
        itemAddress,
        setItemAddress,
        recipientAddress,
        setRecipientAddress,
        categoryId,
        setCategoryId,
        errandRoute,
        setErrandRoute,
        vehicleType,
        setVehicleType,
        vehicleId,
        setVehicleId,
        rides,
        setRides,
        setUserType,
        addNote,
        setAddNote,
        subTypeId,
        setSubTypeId,
        errandAccepted,
        setErrandAccepted,
        socketUrl,
        setSocketUrl,
        message,
        setMessage,
        searchModal,
        setSearchModal,
        rideDetailsModal,
        setRideDetailsModal,
        agentInfo,
        setAgentInfo,
        errandId,
        setErrandId,
        isAcceptingErrand, 
        setIsAccepting,
        socketRef , 
        setSocket
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
