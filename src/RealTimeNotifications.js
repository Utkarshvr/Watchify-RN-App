// import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import { useNotificationAPI } from "./context/NotificationContext";

export default function RealTimeNotifications({ children }) {
  const { openNotification, refreshNotifications } = useNotificationAPI();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Connect to the socket server
    const socket = io(process.env.EXPO_PUBLIC_API_URL_ROOT || "https://watchifyserver.serveo.net", {
      withCredentials: true,
      transports: ["websocket", "polling", "flashsocket"],
    });

    // Handle socket events
    socket.on("connect", () => {
      setIsLoading(false);
      console.log("🛜🛜 Connected to the socket server 🛜🛜");
    });

    socket.on("connect_error", (error) => {
      console.log("⚠️ Connection error:", error);
      setIsLoading(false);
      // Handle the connection error as needed
    });

    socket.on("connect_timeout", (timeout) => {
      console.log("⚠️ Connection timeout:", timeout);
      setIsLoading(false);
      // Handle the connection timeout as needed
    });

    socket.on("disconnect", (reason) => {
      setIsLoading(false);
      console.log("🔌 Disconnected from the socket server. Reason:", reason);
      // Handle the disconnection as needed
    });

    // Main Events
    socket.on("notify-user", (notification) => {
      console.log("Received message:", notification);
      // Update your React component state or perform any other actions
      openNotification(notification, notification?.severity);
      refreshNotifications();
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  console.log({ isLoading });
  if (isLoading) return <LoadingOverlay />;

  return <>{children}</>;
}
