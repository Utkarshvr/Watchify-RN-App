import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import PropTypes from "prop-types";
import { VideoContextAPI, VideoContextData } from "../context/VideoContext";

export default function VideoProvider({ children, videoID }) {
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  const videoUUID = video?._id || null;

  const loadVideo = async () => {
    if (isLoading || !videoID) return;

    console.log("Fetching Video");
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/video/${videoID}`);

      setVideo(data?.video);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsInitialLoadDone(true);
    }
  };

  const api = useMemo(() => {
    const reset = () => {
      setVideo(null);
      setIsLoading(false);
    };

    return { setVideo, setIsLoading, reset };
  }, []);

  useEffect(() => {
    if (videoID && !isLoading) loadVideo();
  }, [videoID]);

  return (
    <>
      <VideoContextData.Provider value={{ video, isLoading, videoID, videoUUID, isInitialLoadDone }}>
        <VideoContextAPI.Provider value={api}>{children}</VideoContextAPI.Provider>
      </VideoContextData.Provider>
    </>
  );
}

VideoProvider.propTypes = {
  children: PropTypes.element,
  videoID: PropTypes.string.isRequired,
};
