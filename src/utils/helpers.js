import * as SecureStore from "expo-secure-store";

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
