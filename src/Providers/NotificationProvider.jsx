import { useState } from "react";
import { NotificationAPIContext, NotificationDATAContext } from "../context/NotificationContext";
import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

export default function NotificationProvider({ children }) {
  const [fetchAgain, setFetchAgain] = useState(false);
  const toast = useToast();

  const openNotification = (notification, action = "info", variant = "accent") => {
    console.log({ notification });

    toast.show({
      placement: "bottom left",
      render: ({ id }) => {
        const toastId = "toast-" + id;

        return (
          <Toast nativeID={toastId} action={action} variant={variant}>
            <VStack space="xs">
              <ToastTitle size="xs">{notification?.content || notification?.title}</ToastTitle>
              {notification?.desc && <ToastDescription size="xs">{notification?.desc}</ToastDescription>}
            </VStack>
          </Toast>
        );
      },
    });
  };

  const refreshNotifications = () => setFetchAgain((prev) => !prev);

  return (
    <NotificationDATAContext.Provider value={{ fetchAgain }}>
      <NotificationAPIContext.Provider value={{ openNotification, refreshNotifications }}>
        {children}
      </NotificationAPIContext.Provider>
    </NotificationDATAContext.Provider>
  );
}
