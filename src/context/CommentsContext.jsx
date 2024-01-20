import { createContext, useContext } from "react";

export const CommentsContextData = createContext({
  videoUUID: null,

  comments: [],
  isLoading: false,

  //   isError: false,
  //   error: null,
});

export const CommentsContextAPI = createContext({
  setVideo: () => {},
  setIsLoading: () => {},

  reset: () => {},
});

export const useCommentsData = () => useContext(CommentsContextData);
export const useCommentsAPI = () => useContext(CommentsContextAPI);
