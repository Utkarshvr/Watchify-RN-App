import { useEffect, useMemo, useState } from "react";
import { getStorage, logoutUser } from "../utils/helpers";
import axiosInstance from "../utils/axiosInstance";
import { AuthContextAPI, AuthContextData } from "../context/AuthContext";
import { getUserRoute } from "../utils/api/api.routes";
import PropTypes from "prop-types";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [shouldRetry, setShouldRetry] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const api = useMemo(() => {
    const reset = () => {
      setUser(null);
      setIsLoading(false);
      setAuthToken(null);

      logoutUser();
    };

    return { setAuthToken, setUser, setIsLoading, reset, setShouldRetry };
  }, []);

  useEffect(() => {
    getStorage("authToken").then((result) => {
      axiosInstance.defaults.headers.common["Authorization"] = result;

      setAuthToken(result || null);
    });
  }, []);

  useEffect(() => {
    console.log({ authToken, shouldRetry });
    if (authToken && shouldRetry) {
      setIsLoading(true);
      console.log("🚀🚀🚀 TRYING TO FETCH THE USER 🚀🚀🚀");
      axiosInstance
        .get(getUserRoute)
        .then(({ data }) => {
          console.log("👽👽👽👽👽 GOT THE USER 👽👽👽👽👽");
          setUser(data?.data?.user);
          setShouldRetry(false);
        })
        .catch((error) => {
          console.log({ ERROR_IN_AUTH_PROVIDERR: error });

          if (
            error?.config?.url?.includes(getUserRoute) &&
            error?.response &&
            (error?.response?.status === 401 || error?.response?.status === 403)
          ) {
            console.log("AUTH_TOKEN: REMOVED❌");
            setShouldRetry(false);

            // Reset the states
            api.reset();

            // // Send back the user to index page
            // router.replace("/");
          } else {
            {
              retryCount <= 4 &&
                setTimeout(() => {
                  console.log("WILL TRY AGAIN IN ~ 2s 🙂🙂");
                  setShouldRetry(Math.random());
                }, 2000);
            }
            console.log("AUTH_TOKEN: UNTOUCHED");
          }
        })
        .finally(() => {
          setIsLoading(false);
          setRetryCount((prev) => prev + 1);
        });
    } else {
      setIsLoading(false);
      if (!authToken) console.log("Auth Token not present. Therefore, Not fetching user");
      if (shouldRetry === false) console.log("There's no need to retry fetching the user");
    }
  }, [authToken, shouldRetry]);

  return (
    <>
      <AuthContextData.Provider value={{ user, isLoading, authToken, isAuth: !!user }}>
        <AuthContextAPI.Provider value={api}>{children}</AuthContextAPI.Provider>
      </AuthContextData.Provider>
    </>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element,
};
