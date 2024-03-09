import { useEffect } from "react";
import { router } from "expo-router";

import axiosInstance from "../utils/axiosInstance";
import { useAuthAPI } from "../context/AuthContext";
import PropTypes from "prop-types";
import { getUserRoute } from "../utils/api/api.routes";
import { openLoginUrl } from "../utils/api/apiCalls";

const AxiosInterceptor = ({ children }) => {
  const { reset } = useAuthAPI();

  useEffect(() => {
    const fullfilledInterceptor = (response) => response;

    const errorInterceptor = async (error) => {
      console.log({ AXIOS_ERROR: error });
      if (
        error?.config?.url?.includes(getUserRoute) &&
        error?.response &&
        (error?.response?.status === 401 || error?.response?.status === 403)
      ) {
        console.log("AUTH_TOKEN: REMOVED");
        // Reset the states
        reset();

        // Send back the user to index page
        router.replace("/");
      } else {
        console.log("AUTH_TOKEN: UNTOUCHED");
      }

      if (
        !error?.config?.url?.includes(getUserRoute) &&
        (error?.response?.status === 401 || error?.response?.status === 403)
      )
        return openLoginUrl();

      return Promise.reject(error);
    };

    const interceptor = axiosInstance.interceptors.response.use(fullfilledInterceptor, errorInterceptor);

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
};

AxiosInterceptor.propTypes = {
  children: PropTypes.element,
};

export default AxiosInterceptor;
