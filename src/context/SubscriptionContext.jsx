import { createContext, useContext } from "react";

export const SubscriptionDataContext = createContext({
  subscriptions: [],
  isLoading: false,
  videos: [],
});
export const SubscriptionAPIContext = createContext();

export const useSubscriptionData = () => useContext(SubscriptionDataContext);
