import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoadingOverlay from "./components/ui/LoadingOverlay";
// import { useNotificationAPI } from "./context/NotificationContext";

export default function RealTimeNotifications({ children }) {
  // const { openNotification, refreshNotifications } = useNotificationAPI();
  const toast = useToast();
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    // Connect to the socket server
    const socket = io(process.env.EXPO_PUBLIC_API_URL_ROOT || "https://watchifyserver.serveo.net", {
      withCredentials: true,
      transports: ["websocket", "polling", "flashsocket"],
    });

    // Handle socket events
    socket.on("connect", () => {
      setIsSocketConnected(true);
      console.log("🛜🛜 Connected to the socket server 🛜🛜");
    });

    socket.on("notify-user", (notification) => {
      console.log("Received message:", notification);
      // Update your React component state or perform any other actions

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <Toast nativeID={toastId} action={"info"} variant={"accent"}>
              <VStack space="xs">
                <ToastTitle>{notification?.title}</ToastTitle>
                <ToastDescription>{notification?.desc}</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  if (!isSocketConnected) return <LoadingOverlay />;

  return <>{children}</>;
}
