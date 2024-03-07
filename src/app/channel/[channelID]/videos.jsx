import { Box, Text } from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Loading from "../../../components/ui/Loading";
import { FlatList } from "@gluestack-ui/themed";
import VideoCard from "../../../components/card/VideoCard";

export default function VideosTab() {
  const { channelID } = useGlobalSearchParams();
  const { bgColor } = useBGColor();

  const [videos, setVideos] = useState([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const loadVideos = async (channelID) => {
    setIsVideoLoading(true);

    try {
      const { data } = await axiosInstance.get(`channel/${channelID}/videos`);
      setVideos(data?.videos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsVideoLoading(false);
    }
  };

  useEffect(() => {
    if (channelID) {
      loadVideos(channelID);
    }
  }, [channelID]);

  return (
    <Box flex={1} bgColor={bgColor}>
      <Box width={"$full"} p={"$2"} minHeight={"$24"}>
        {isVideoLoading ? (
          <Loading />
        ) : videos?.length === 0 ? (
          <Text>{"This Channel hasn't uploaded any video yet!"}</Text>
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(vid) => vid?._id}
            renderItem={({ item }) => {
              return <VideoCard video={item} size="xs" usage={"my-videos"} />;
            }}
          />
        )}
      </Box>
    </Box>
  );
}
