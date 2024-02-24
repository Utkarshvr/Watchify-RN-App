import VideoFeed from "../../../components/feed/VideoFeed";
import { Box, Heading } from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";
import { useLocalSearchParams } from "expo-router";

export default function searchFeed() {
  const { bgColor } = useBGColor();
  const { searchTextStudio } = useLocalSearchParams();

  return (
    <Box bgColor={bgColor} flex={1}>
      <Heading>Results for: {searchTextStudio}</Heading>
      <VideoFeed />
    </Box>
  );
}
