import { createContext, useContext } from "react";

export const AuthContextData = createContext({
  isAuth: false,
  user: null,
  authToken: null,
  isLoading: false,
});

export const AuthContextAPI = createContext({
  setAuthToken: () => {},
  setUser: () => {},
  setIsLoading: () => {},

  setShouldRetry: () => {},
  reset: () => {},
});

export const useAuthData = () => useContext(AuthContextData);
export const useAuthAPI = () => useContext(AuthContextAPI);
