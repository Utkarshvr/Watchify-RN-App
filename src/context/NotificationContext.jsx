import { createContext, useContext } from "react";

export const NotificationDATAContext = createContext({ fetchAgain: false });
export const NotificationAPIContext = createContext({
  openNotification: () => {},
  refreshNotifications: () => {},
});

export const useNotificationAPI = () => useContext(NotificationAPIContext);
export const useNotificationData = () => useContext(NotificationDATAContext);
