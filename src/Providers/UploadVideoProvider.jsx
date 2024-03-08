import { useState } from "react";
import { UploadVideoAPIContext, UploadVideoDataContext } from "../context/UploadVideoContext";

export default function UploadVideoProvider({ children }) {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <UploadVideoDataContext.Provider value={{ video, thumbnail }}>
      <UploadVideoAPIContext.Provider value={{ setVideo, setThumbnail }}>{children}</UploadVideoAPIContext.Provider>
    </UploadVideoDataContext.Provider>
  );
}
