import { createContext, useContext } from "react";

export const CreatePlaylistModalContext = createContext({
  open: false,
  showModal: () => {},
  closeModal: () => {},
  createNewPlaylist: () => {},
});

export const CreatePlaylistModalDataContext = createContext({
  isNewPlaylistCreated: 0.5,
});

export const useCreatePlaylistModal = () => useContext(CreatePlaylistModalContext);
export const useCreatePlaylistModalData = () => useContext(CreatePlaylistModalDataContext);
