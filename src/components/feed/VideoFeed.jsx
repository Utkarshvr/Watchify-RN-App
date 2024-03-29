import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FlatList } from "@gluestack-ui/themed";
import VideoCard from "../card/VideoCard";
import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_VIDEOS_ROUTE } from "../../utils/api/api.routes";
import Loading from "../ui/Loading";

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVideos = async () => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(GET_ALL_VIDEOS_ROUTE);
      setVideos(data?.videos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) loadVideos();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={videos}
      keyExtractor={(video) => video?._id}
      renderItem={({ item }) => <VideoCard video={item} />}
      refreshing={isLoading}
      onRefresh={loadVideos}
    />
  );
}

VideoFeed.propTypes = {
  type: PropTypes.string,
};
