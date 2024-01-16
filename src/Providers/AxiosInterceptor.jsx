import { useEffect } from "react";
import { router } from "expo-router";

import axiosInstance from "../utils/axiosInstance";
import { useAuthAPI } from "../context/AuthContext";
import { deleteStorage } from "../utils/helpers";

const AxiosInterceptor = ({ children }) => {
  const { reset } = useAuthAPI();

  useEffect(() => {
    const fullfilledInterceptor = (response) => response;

    const errorInterceptor = async (error) => {
      if ((error.response && error.response.status === 401) || error.response.status === 403) {
        // Remove the default Authorizaiton Token from the axios instance
        axiosInstance.defaults.headers.common["Authorization"] = "";

        // Delete the auth token from Async Storage
        await deleteStorage("authToken");

        // Reset the states
        reset();

        // Send back the user to index page
        router.replace("/");
      }
      return Promise.reject(error);
    };

    const interceptor = axiosInstance.interceptors.response.use(fullfilledInterceptor, errorInterceptor);

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
};

export default AxiosInterceptor;
