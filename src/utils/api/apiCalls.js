import axiosInstance, { API_URL } from "../axiosInstance";

import { Linking } from "react-native";
import { saveStorage } from "../helpers";

export function openLoginUrl() {
  Linking.openURL(`${API_URL}/auth/google/callback`);
}

export const handleOpenURL = async (url) => {
  if (!url) return;
  // Extract stringified user string out of the URL
  const user = decodeURI(url).match(/firstName=([^#]+)\/lastName=([^#]+)\/email=([^#]+)\/JWT_TOKEN=([^#]+)/);
  await saveStorage("authToken", user[4]);
  axiosInstance.defaults.headers.common["Authorization"] = user[4];

  return user[4];
};
