import { createContext, useContext } from "react";

export const CreatePlaylistModalContext = createContext({
  open: false,
  showModal: () => {},
  closeModal: () => {},
});

export const useCreatePlaylistModal = () => useContext(CreatePlaylistModalContext);
