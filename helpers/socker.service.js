import { useContext, useEffect, useRef, useState } from "react";
import { getAsyncToken, getUserId } from "./asyncStorage";
import { GlobalContext } from "../context/context.store";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);
  const {
    createErrandSent,
    setCreatErrandSent,
    setReceiveErrand,
    setAcceptedErrand,
    userId,
    socketUrl
  } = useContext(GlobalContext);

  const [messageToSend, setMessageToSend] = useState(null);

  const fetchToken = async () => {
    const asyncToken = await getAsyncToken();
    // console.log("token:::", asyncToken);
    setToken(asyncToken);
  };

  const initializeSocket = () => {
    if (!token) return;

    const SOCKET_URL = `https://herrand-backend-5a39ee15054e.herokuapp.com/${socketUrl}/?token=${token}`;

    try {
      const socket = new WebSocket(SOCKET_URL, {
        transports: ["websocket"],
      });

      console.log("socket:::", socket);

      socketRef.current = socket;

      socket.onopen = (e) => {
        console.log("Socket connected", socket.readyState);
        setIsConnected(true);
        // if (messageToSend) {
        //   socket.send(JSON.stringify(messageToSend));
        //   setMessageToSend(null);
        // }
      };
      socket.onmessage = (event) => {
        console.log("Received message from the server:", event.data);
        const data = JSON.parse(event.data);
        if (
          data.type === "errand.requested" &&
          data.data.status === "REQUESTED"
        ) {
          setReceiveErrand(data.data);
          setAcceptedErrand([]);
        } else if (
          data.type === "errand.accepted" &&
          data.data.status === "ACCEPTED" &&
          data.data.agent?.id == userId
        ) {
          setReceiveErrand([]);
          setAcceptedErrand(data.data);
          console.log("woll");
        }
      };

      socket.onclose = (event) => {
        if (event.code === 1000) {
          console.log("WebSocket connection closed gracefully");
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
  if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log("message sent in socket", message);
    } else {
      setMessageToSend(message); // Save the message to send when the socket opens
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
