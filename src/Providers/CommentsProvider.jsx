import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import PropTypes from "prop-types";
import { CommentsContextAPI, CommentsContextData } from "../context/CommentsContext";
import { useVideoData } from "../context/VideoContext";

export default function CommentsProvider({ children }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { videoUUID } = useVideoData();

  const loadComments = async (videoUUID) => {
    if (isLoading || !videoUUID) return;

    console.log("LOADING COMMENTS...👽👽");

    setIsLoading(true);
    try {
      const url = `/video/${videoUUID}/comments`;
      const { data } = await axiosInstance.get(url);

      setComments(data?.data?.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const api = useMemo(() => {
    const reset = () => {
      setComments([]);
      setIsLoading(false);
    };

    return { setComments, setIsLoading, loadComments, reset };
  }, []);

  useEffect(() => {
    if (videoUUID && !isLoading) loadComments(videoUUID);
  }, [videoUUID]);

  return (
    <>
      <CommentsContextData.Provider value={{ comments, isLoading, videoUUID }}>
        <CommentsContextAPI.Provider value={api}>{children}</CommentsContextAPI.Provider>
      </CommentsContextData.Provider>
    </>
  );
}

CommentsProvider.propTypes = {
  children: PropTypes.element,
};
