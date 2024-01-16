/* eslint-disable no-undef */
import axios from "axios";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default axiosInstance;
