import { FlatList } from "@gluestack-ui/themed";
import VideoCard from "../card/VideoCard";
import { useSubscriptionData } from "../../context/SubscriptionContext";

export default function SubscriptionVideos() {
  const { videos } = useSubscriptionData();
  // console.log({ videos });
  return (
    <FlatList
      data={videos}
      keyExtractor={(video) => video?._id}
      renderItem={({ item }) => <VideoCard video={item} />}
    />
  );
}
