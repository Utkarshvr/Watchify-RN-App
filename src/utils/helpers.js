import * as SecureStore from "expo-secure-store";
import axiosInstance from "./axiosInstance";

export async function saveStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteStorage(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function getStorage(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function logoutUser() {
  await deleteStorage("authToken");
  axiosInstance.defaults.headers.common["Authorization"] = "";
}

export function formatVideoDuration(decimalSeconds) {
  // Convert decimal seconds to integer seconds
  const seconds = Math.floor(decimalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  // Format the result as "h:m:s"
  const formattedDuration = `${hours ? `:${hours}` : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;

  return formattedDuration;
}
