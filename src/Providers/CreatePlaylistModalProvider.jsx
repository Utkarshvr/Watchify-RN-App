import { useState } from "react";
import { CreatePlaylistModalContext, CreatePlaylistModalDataContext } from "../context/CreatePlaylistModalContext";

export default function CreatePlaylistModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [isNewPlaylistCreated, setIsNewPlaylistCreated] = useState(0.5);

  console.log({ isNewPlaylistCreated });

  const createNewPlaylist = () => {
    const randomNum = Math.random();
    console.log("::createNewPlaylist:: ", randomNum);
    setIsNewPlaylistCreated(randomNum);
  };

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <CreatePlaylistModalDataContext.Provider value={{ isNewPlaylistCreated }}>
      <CreatePlaylistModalContext.Provider value={{ open, showModal, closeModal, createNewPlaylist }}>
        {children}
      </CreatePlaylistModalContext.Provider>
    </CreatePlaylistModalDataContext.Provider>
  );
}
