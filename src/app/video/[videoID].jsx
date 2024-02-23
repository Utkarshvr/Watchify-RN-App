import { Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { formatDistanceToNow } from "date-fns";
import { Box, Button, ButtonIcon, ButtonText, ChevronDownIcon, Text } from "@gluestack-ui/themed";

import { Video, ResizeMode } from "expo-av";
import Loading from "../../components/ui/Loading";
import useBGColor from "../../hooks/useBGColor";
import VideoCardActions from "../../components/action/VideoCardActions";
import VideoDescSheet from "../../components/actionsheet/VideoDescSheet";
import VideoComments from "../../components/VideoComments";
import CommentsProvider from "../../Providers/CommentsProvider";
import VideoProvider from "../../Providers/VideoProvider";
import { useVideoData } from "../../context/VideoContext";
import ErrorScreen from "../../components/ui/ErrorScreen";
import SubscribeChannelBtn from "../../components/action/SubscribeChannelBtn";

export default function MainProviderWrapper() {
  const { videoID } = useLocalSearchParams();
  console.log({ videoID });

  return (
    <>
      <VideoProvider videoID={videoID}>
        <CommentsProvider>
          <VideoScreen />
        </CommentsProvider>
      </VideoProvider>
    </>
  );
}

export function VideoScreen() {
  const { video, isLoading } = useVideoData();

  const [isDescSheetOpen, setIsDescSheetOpen] = useState(false);

  const { bgColor } = useBGColor();

  const openDescSheet = () => {
    setIsDescSheetOpen(true);
  };

  if (isLoading) return <Loading />;

  if (!isLoading && !video) return <ErrorScreen msg="Video not found" />;

  return (
    <Box flex={1} bgColor={bgColor}>
      <Box>
        <Video
          style={{
            width: "100%",
            height: 220,
            minHeight: 220,
            maxHeight: 220,
          }}
          source={{
            uri: video?.link || "",
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
        />
      </Box>
      <Box gap="$1" p="$2" mb={"$4"}>
        <TouchableOpacity onPress={openDescSheet}>
          <Box gap="$1">
            <Box justifyContent="space-between" flexDirection="row">
              <Text flex={0.95} style={{ fontWeight: "bold" }}>
                {video?.title}
              </Text>

              <Button flex={0.05} action="secondary" variant="link">
                <ButtonIcon as={ChevronDownIcon} />
              </Button>
            </Box>

            <Box flexDirection="row">
              <Text fontSize={"$xs"}>
                {String(video?.views_count)} {"views"}
              </Text>

              <Text>{" ~ "}</Text>

              {video?.createdAt ? (
                <Text fontSize={"$xs"}>
                  {formatDistanceToNow(video?.createdAt || "", {
                    addSuffix: true,
                  })}
                </Text>
              ) : null}
            </Box>
          </Box>
        </TouchableOpacity>
        <Box flexDirection="row" justifyContent="space-between">
          <TouchableOpacity onPress={() => router.push(`/channel/${video?.creator?._id}`)}>
            <Box flexDirection="row" gap={"$2"} alignItems="center">
              <Image source={{ uri: video?.creator?.picture }} style={{ height: 40, width: 40, borderRadius: 9999 }} />
              <Text fontSize={"$xs"}>{video?.creator?.name}</Text>
              <Text fontSize={"$xs"} color="$secondary400">
                {"(3)"}
              </Text>
            </Box>
          </TouchableOpacity>
          {/* <Button
            // variant="outline"
            size="xs"
            rounded={"$3xl"}
          >
            <ButtonText>Subscribe</ButtonText>
          </Button> */}
          <SubscribeChannelBtn channel={video?.creator} />
        </Box>
        {/* Actions */}
        <VideoCardActions />
      </Box>

      <Box p="$2">
        <VideoComments />
      </Box>
      <VideoDescSheet isDescSheetOpen={isDescSheetOpen} setIsDescSheetOpen={setIsDescSheetOpen} />
    </Box>
  );
}
