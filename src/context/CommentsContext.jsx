import { createContext, useContext } from "react";

export const CommentsContextData = createContext({
  videoUUID: null,

  comments: [],
  isLoading: false,
});

export const CommentsContextAPI = createContext({
  setVideo: () => {},
  setIsLoading: () => {},

  reset: () => {},
  loadComments: () => {},
});

export const useCommentsData = () => useContext(CommentsContextData);
export const useCommentsAPI = () => useContext(CommentsContextAPI);
