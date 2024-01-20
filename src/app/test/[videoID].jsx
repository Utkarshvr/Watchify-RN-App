import { useLocalSearchParams } from "expo-router";
import VideoProvider from "../../Providers/VideoProvider";
import { Box, Text } from "@gluestack-ui/themed";
import { useVideoData } from "../../context/VideoContext";
import CommentsProvider from "../../Providers/CommentsProvider";
import { useCommentsData } from "../../context/CommentsContext";

export default function ProviderWrapper() {
  const { videoID } = useLocalSearchParams();

  return (
    <>
      <VideoProvider videoID={videoID}>
        <CommentsProvider>
          <TestVideoScreen />
        </CommentsProvider>
      </VideoProvider>
    </>
  );
}

function TestVideoScreen() {
  const { video } = useVideoData();
  console.log(video?.thumbnail);

  return (
    <Box flex={1} bgColor="$secondary950">
      <Text>Childdd</Text>
      <Comments />
    </Box>
  );
}

function Comments() {
  const { comments, videoUUID } = useCommentsData();

  return (
    <>
      <Text>Comments of video with UUID: {videoUUID} </Text>
      <Text>Number of comments: {comments?.length} </Text>
    </>
  );
}
