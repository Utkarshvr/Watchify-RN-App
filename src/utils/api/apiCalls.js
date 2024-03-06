import axiosInstance, { API_URL } from "../axiosInstance";

import * as WebBrowser from "expo-web-browser";
import { saveStorage } from "../helpers";

export async function openLoginUrl() {
  await WebBrowser.openBrowserAsync(`${API_URL}/auth/google?source=mobile`);
}

export const handleOpenURL = async (url) => {
  try {
    console.log({ url });

    if (!url) {
      // Handle the case when the URL is empty
      return null;
    }

    // Extract stringified user string out of the URL
    // const user = decodeURI(url).match(/firstName=([^#]+)\/lastName=([^#]+)\/email=([^#]+)\/JWT_TOKEN=([^#]+)/);
    // Regular expression to extract JWT_TOKEN
    const jwtTokenRegex = /JWT_TOKEN=([^&]+)/;
    const match = url.match(jwtTokenRegex);
    const jwtToken = match[1];

    if (!match) {
      // Handle the case when the user data cannot be extracted from the URL
      return null;
    }

    await saveStorage("authToken", jwtToken);
    axiosInstance.defaults.headers.common["Authorization"] = jwtToken;
    console.log({ authToken: jwtToken });

    return jwtToken;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in handleOpenURL:", error);
    return null;
  }
};
