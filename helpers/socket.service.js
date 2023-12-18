import { useContext, useEffect, useRef, useState } from "react";
import { getAsyncToken } from "./asyncStorage";
import { GlobalContext } from "../context/context.store";
import { useNavigation } from "@react-navigation/native";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);
  const {
    createErrandSent,
    setCreatErrandSent,
    errandRoute,
    setErrandRoute,
    setRides,
    setErrandAccepted,
  } = useContext(GlobalContext);
  const navigation = useNavigation();

  const [messageToSend, setMessageToSend] = useState(null);

  const fetchToken = async () => {
    const asyncToken = await getAsyncToken();
    console.log("token:::", asyncToken);
    setToken(asyncToken);
  };

  const initializeSocket = () => {
    if (!token) return;

    const SOCKET_URL = `https://herrand-backend-5a39ee15054e.herokuapp.com/errand/?token=${token}`;

    const connectWebSocket = () => {
      try {
        const socket = new WebSocket(SOCKET_URL, {
          transports: ["websocket"],
        });

        console.log("socket:::", socket);

        socketRef.current = socket;

        socket.onopen = (e) => {
          console.log("Socket connected", socket.readyState);
          setIsConnected(true);
          if (messageToSend) {
            socket.send(JSON.stringify(messageToSend));
            setMessageToSend(null);
          }
        };

        socket.onmessage = (event) => {
          console.log("Received message from the server:", event.data);
          if (event.data) {
            const parsedData = JSON.parse(event.data);
            console.log("parsed data:::", parsedData);
            if (parsedData.data) {
              navigation.navigate("CustomerErrandMap");
              setRides({
                vehicleDetails: parsedData.data.vehicle_type,
                estimated_drop_off_time:
                  parsedData.data.estimated_drop_off_time,
                drop_off_address: parsedData.data.drop_off_address,
                total_cost: parsedData.data.total_cost,
                errand_id: parsedData.data.id,
              });
              console.log("parsed data:::", parsedData.data.vehicle_type);
            }
            if (parsedData.type === "errand.accepted") {
              setErrandAccepted(true);
            }
            setCreatErrandSent(true);
          } else {
            setCreatErrandSent(false);
          }
        };

        socket.onclose = (event) => {
          if (event.code === 1000) {
            console.log("WebSocket connection closed gracefully");
            connectWebSocket();
          } else {
            handleButtonClick();
            console.log(
              `WebSocket connection closed with code: ${event.code}`,
              `reason: ${event.reason}`
            );
            connectWebSocket();
          }
        };

        socket.onerror = (error) => {
          console.log("Socket error", error);
          setIsConnected(false);
          connectWebSocket();
        };
      } catch (err) {
        console.log("Socket is not initialized", err);
        setIsConnected(false);
        connectWebSocket();
      }
    };

    // const reconnect = () => {
    //   if (reconnectAttempts < maxReconnectAttempts) {
    //     reconnectAttempts++;
    //     console.log(`Reconnecting attempt ${reconnectAttempts}...`);
    //     setTimeout(() => connectWebSocket(), 1000); // You can adjust the delay as needed
    //   } else {
    //     console.log("Max reconnect attempts reached. Unable to reconnect.");
    //   }
    // };

    connectWebSocket();
  };

  const handleSendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log("message sent in socket", message);
    } else {
      // Socket is not open, connect it and then send the message
      console.log("Socket is not ready. Connecting...");

      // Connect the socket
      initializeSocket();

      // Save the message to be sent when the socket opens
      setMessageToSend(message);
      console.log("Message will be sent when the socket opens.");
    }
  };

  const handleButtonClick = () => {
    fetchToken();
  };

  useEffect(() => {
    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Run the effect whenever the token changes

  return {
    handleButtonClick,
    isConnected,
    sendMessage: handleSendMessage,
    // ...other functions and state you want to expose
  };
};

export default useSocket;
