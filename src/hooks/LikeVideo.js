import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useVideoData } from "../context/VideoContext";

export default function useLikeVideo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const { video, videoID } = useVideoData();

  useEffect(() => {
    if (video) {
      setIsLiked(video?.isLiked);
      setLikesCount(video?.likes_count);
    }
  }, [video]);

  const likeVideo = async () => {
    if (!videoID) return;

    try {
      const { data } = await axiosInstance.post(`/like/${videoID}?contentType=video`);
      console.log("Like Video: ", data);

      setIsLiked(data?.isLiked);
      setLikesCount((prev) => (data?.isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return { likeVideo, isLiked, likesCount };
}
