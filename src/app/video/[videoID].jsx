import { Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { formatDistanceToNow } from "date-fns";
import { Box, Button, ButtonIcon, ButtonText, ChevronDownIcon, Text } from "@gluestack-ui/themed";
import axiosInstance from "../../utils/axiosInstance";

import { Video, ResizeMode } from "expo-av";
import Loading from "../../components/ui/Loading";
import useBGColor from "../../hooks/useBGColor";
import VideoCardActions from "../../components/action/VideoCardActions";
import VideoDescSheet from "../../components/actionsheet/VideoDescSheet";
import VideoComments from "../../components/VideoComments";

export default function VideoDetails() {
  const { videoID } = useLocalSearchParams();

  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isDescSheetOpen, setIsDescSheetOpen] = useState(false);

  const { bgColor } = useBGColor();

  const loadVideo = async () => {
    if (isLoading || !videoID) return;

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/video/${videoID}`);
      // console.log(data);

      setVideo(data?.video);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDescSheet = () => {
    setIsDescSheetOpen(true);
  };

  useEffect(() => {
    if (videoID) loadVideo();
  }, [videoID]);

  if (isLoading) return <Loading />;

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
          <Box flexDirection="row" gap={"$2"} alignItems="center">
            <Image source={{ uri: video?.creator?.picture }} style={{ height: 40, width: 40, borderRadius: 9999 }} />
            <Text fontSize={"$xs"}>{video?.creator?.name}</Text>
            <Text fontSize={"$xs"} color="$secondary400">
              {"(3)"}
            </Text>
          </Box>
          <Button
            // variant="outline"
            size="xs"
            rounded={"$3xl"}
          >
            <ButtonText>Subscribe</ButtonText>
          </Button>
        </Box>
        {/* Actions */}
        <VideoCardActions />
      </Box>

      <Box p="$2">
        <VideoComments videoUUID={video?._id} />
      </Box>
      <VideoDescSheet desc={video?.desc} isDescSheetOpen={isDescSheetOpen} setIsDescSheetOpen={setIsDescSheetOpen} />
    </Box>
  );
}
