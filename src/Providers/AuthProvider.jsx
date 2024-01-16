import { useEffect, useMemo, useState } from "react";
import { getStorage } from "../utils/helpers";
import axiosInstance from "../utils/axiosInstance";
import { AuthContextAPI, AuthContextData } from "../context/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const api = useMemo(() => {
    const reset = () => {
      setUser(null);
      setIsLoading(false);
      setAuthToken(null);
    };

    return { setAuthToken, setUser, setIsLoading, reset };
  }, []);

  useEffect(() => {
    getStorage("authToken").then((result) => {
      axiosInstance.defaults.headers.common["Authorization"] = result;

      setAuthToken(result || null);
    });
  }, []);

  useEffect(() => {
    if (authToken) {
      // setIsLoading(true);
      // getUser()
      //   .then((data) => {
      //     console.log(data?.data?.user?.email);
      //     setUser(data?.data?.user);
      //   })
      //   .catch(api.reset)
      //   .finally(() => setIsLoading(false));
    } else {
      console.log("Auth Token not present. Therefore, Not fetching user");
    }
  }, [authToken]);

  return (
    <>
      <AuthContextData.Provider value={{ user, isLoading, authToken, isAuthorized: !!user }}>
        <AuthContextAPI.Provider value={api}>{children}</AuthContextAPI.Provider>
      </AuthContextData.Provider>
    </>
  );
}
