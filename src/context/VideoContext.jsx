import { createContext, useContext } from "react";

export const VideoContextData = createContext({
  videoID: null,
  videoUUID: null,

  video: null,
  isLoading: false,
  isInitialLoadDone: false,

  //   isError: false,
  //   error: null,
});

export const VideoContextAPI = createContext({
  setVideo: () => {},
  setIsLoading: () => {},

  reset: () => {},
});

export const useVideoData = () => useContext(VideoContextData);
export const useVideoAPI = () => useContext(VideoContextAPI);
