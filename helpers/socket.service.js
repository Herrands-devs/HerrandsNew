import { useContext, useEffect, useRef, useState } from "react";
import { getAsyncToken } from "./asyncStorage";
import { GlobalContext } from "../context/context.store";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { toggleIsLoading } from "../reducers/dataReducer";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const {
    setCreatErrandSent,
    setRides,
    setErrandAccepted,
    setSearchModal,
    setRideDetailsModal,
    setAgentInfo,
    setErrandId,
    socketRef, 
    setSocket
  } = useContext(GlobalContext);
  const navigation = useNavigation();

  const [messageToSend, setMessageToSend] = useState(null);

  const fetchToken = async () => {
    const asyncToken = await getAsyncToken();
    // console.log("token:::", asyncToken);
    setToken(asyncToken);
  };

  const initializeSocket = () => {
    if (!token) return;
    console.log("Connecting websocket");
    const SOCKET_URL = `https://jellyfish-app-gd9q8.ondigitalocean.app/errand/?token=${token}`;
    const socket = new WebSocket(SOCKET_URL, {
      transports: ["websocket"],
    });
    try {
      console.log("socket:::", socket);
      setSocket(socket);
      socket.onopen = (e) => {
        console.log("Socket connected", socket.readyState);
        setIsConnected(true);
        if (messageToSend) {
          socket.send(JSON.stringify(messageToSend));
          setMessageToSend(null);
        }
      };

      socket.onmessage = (event) => {
        console.log(event)
        if (event.data) {
          const parsedData = JSON.parse(event.data);
          console.log("parsed data:::", parsedData);
          console.log("typess:::", parsedData.type);
          if (parsedData.type === "errand.ACCEPTED") {
            console.log("Errand has been accepted");
            setErrandAccepted(true);
            setSearchModal(false);
            setRideDetailsModal(true);
            setAgentInfo(parsedData.data.agent);
            setErrandId(parsedData.data.id);
          }
          if (parsedData.type === "errand.created") {
            setCreatErrandSent(true);
            console.log("Message has been sent!!!!!");
            dispatch(
              toggleIsLoading({
                data: false,
              })
            );
          }
          if (parsedData.data) {
            if (parsedData.data.describe_errand === null) {
              navigation.navigate("CustomerErrandMap");
            } else {
              return;
            }
            setRides({
              vehicleDetails: parsedData.data.vehicle_type,
              estimated_drop_off_time: parsedData.data.estimated_drop_off_time,
              drop_off_address: parsedData.data.drop_off_address,
              total_cost: parsedData.data.total_cost,
              errand_id: parsedData.data.id,
            });
          }
        } else {
          setCreatErrandSent(false);
        }
      };

      socket.onclose = (event) => {
        if (event.code === 1000) {
          console.log("WebSocket connection closed gracefully");
          initializeSocket();
        } else {

          console.log(
            `WebSocket connection closed with code: ${event.code}`,
            `reason: ${event.reason}`
          );
        }
      };

      socket.onerror = (error) => {
        console.log("Socket error", error);
        setIsConnected(false);
      };
    } catch (err) {
      console.log("Socket is not initialized", err);
      setIsConnected(false);
    }
  };

  const handleSendMessage = (message) => {
    dispatch(
      toggleIsLoading({
        data: true,
      })
    );
    setMessageToSend(message)
    if (socketRef && socketRef.readyState === WebSocket.OPEN) {
      socketRef.send(JSON.stringify(message));
      console.log("message sent in socket", message);
    } else {
      // Socket is not open, connect it and then send the message
      setIsConnected(false)
      console.log("Socket is not ready. Connecting...");
      initializeSocket();
    }
  };

  const handleButtonClick = () => {
    fetchToken();
  };

  useEffect(() => {
    initializeSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token , isConnected]); // Run the effect whenever the token changes

  return {
    handleButtonClick,
    isConnected,
    sendMessage: handleSendMessage,
    // ...other functions and state you want to expose
    initializeSocket,
    fetchToken,
  };
};

export default useSocket;
