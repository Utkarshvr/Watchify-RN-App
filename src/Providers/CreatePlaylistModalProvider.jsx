import { useState } from "react";
import { CreatePlaylistModalContext } from "../context/CreatePlaylistModalContext";

export default function CreatePlaylistModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <CreatePlaylistModalContext.Provider value={{ open, showModal, closeModal }}>
      {children}
    </CreatePlaylistModalContext.Provider>
  );
}
