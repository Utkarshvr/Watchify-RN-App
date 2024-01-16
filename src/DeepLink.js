import { useEffect } from "react";
import { Linking } from "react-native";
import { handleOpenURL } from "./utils/api/apiCalls";
import { useAuthAPI } from "./context/AuthContext";

export default function DeepLink() {
  const { setAuthToken } = useAuthAPI();

  useEffect(() => {
    Linking.addEventListener(
      "url",
      (url) =>
        url &&
        handleOpenURL(url.url).then((authToken) => {
          // console.log({ TOKEN___AFTER___LOGIN: authToken });
          setAuthToken(authToken || null);
        }),
    );

    Linking.getInitialURL().then((url) => {
      if (url) handleOpenURL({ url });
    });

    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  return null;
}
