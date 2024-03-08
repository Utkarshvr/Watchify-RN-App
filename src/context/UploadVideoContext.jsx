import { createContext, useContext } from "react";

export const UploadVideoDataContext = createContext({
  video: null,
  thumbnail: null,
});

export const UploadVideoAPIContext = createContext({
  setVideo: () => {},
  setThumbnail: () => {},
});

export const useUploadVideoData = () => useContext(UploadVideoDataContext);
export const useUploadVideoAPI = () => useContext(UploadVideoAPIContext);
