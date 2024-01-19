import { Box, Divider, Heading } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import VideoFeed from "../../components/feed/VideoFeed";

export default function Home() {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} backgroundColor={bgColor} gap={2}>
      <Box p="$2" gap={2}>
        <Heading>All</Heading>
        <Divider />
      </Box>

      <VideoFeed />
    </Box>
  );
}
