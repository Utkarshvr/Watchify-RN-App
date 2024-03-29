import PropTypes from "prop-types";
import { Box, Button, Image, Text } from "@gluestack-ui/themed";

import { formatDistanceToNow } from "date-fns";
import { Entypo, Ionicons } from "@expo/vector-icons";
import useBGColor from "../../hooks/useBGColor";
import { config } from "@gluestack-ui/config";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuthData } from "../../context/AuthContext";
import { formatVideoDuration } from "../../utils/helpers";

export default function VideoCard({ video, usage, size }) {
  const { textColor } = useBGColor();
  const { user } = useAuthData();

  const initialColor = config.tokens.colors.secondary400;
  const [btnColor, setBtnColor] = useState(initialColor);

  function navigateToVideo() {
    router.push(`/video/${video?.videoID}`);
  }

  function navigateToChannel() {
    router.push(`/channel/${video?.creator?._id}`);
  }

  if (!video) return;

  return (
    <TouchableOpacity onPress={navigateToVideo}>
      <Box
        mb={usage === "list" ? "$4" : "$0"}
        flexDirection={size === "xs" ? "row" : "column"}
        alignItems="center"
        justifyContent="center"
      >
        <Box position="relative">
          <Image
            source={{ uri: video?.thumbnail }}
            alt="Thumbnail"
            style={{
              // width: "100%",
              minWidth: size === "xs" ? 150 : "100%",
              width: size === "xs" ? 150 : "100%",
              height: size === "xs" ? 90 : 230,
              minHeight: size === "xs" ? 90 : 230,
              maxHeight: 230,
              borderRadius: usage === "list" ? 12 : 0,
            }}
            objectFit="fill"
            flex={0.05}
          />
          {video?.duration && (
            <Box
              position="absolute"
              bottom={8}
              right={8}
              py="$0"
              px="$1"
              rounded={"$sm"}
              alignItems="center"
              justifyContent="center"
              style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              flexDirection="row"
            >
              <Text size="xs" fontWeight="$bold">
                {formatVideoDuration(video?.duration)}
              </Text>
            </Box>
          )}
        </Box>

        <Box p={"$2"} flex={0.95} gap={8} flexDirection="row">
          {/* Link to Channel */}
          {usage === "my-videos" ||
            (usage === "list" ? null : (
              <TouchableOpacity onPress={navigateToChannel}>
                <Image
                  width={36}
                  height={36}
                  source={{ uri: video?.creator?.picture }}
                  alt="You"
                  style={{ borderRadius: 999 }}
                />
              </TouchableOpacity>
            ))}
          <Box flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box gap={4}>
              <Text size={size || "md"}>{video?.title}</Text>
              <Text size="xs" color="$secondary400">
                {usage !== "my-videos" && video?.creator?.name}
                {usage !== "my-videos" && " | "}
                {video?.views_count ? video?.views_count + " views" : null}
                {" | "}
                {video?.createdAt && formatDistanceToNow(video?.createdAt, { addSuffix: true })}
              </Text>
              {usage === "my-videos" && (
                <Box flexDirection="row" gap={"$3"}>
                  {user?._id === video?.creator?._id && (
                    <Ionicons
                      name={video?.isPublic ? "earth-outline" : "lock-closed-outline"}
                      size={16}
                      color={textColor}
                    />
                  )}
                  <Box flexDirection="row" gap={"$1"}>
                    <Ionicons name="thumbs-up-outline" size={16} color={textColor} />
                    <Text size="xs">{video?.likes_count}</Text>
                  </Box>
                  <Box flexDirection="row" gap={"$1"}>
                    <Ionicons name="chatbox-ellipses-outline" size={16} color={textColor} />
                    <Text size="xs">{video?.comments_count || 0}</Text>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            <Button
              action="secondary"
              variant="link"
              size="xs"
              onPressIn={() => setBtnColor(textColor)}
              onPressOut={() => setBtnColor(initialColor)}
            >
              <Entypo name="dots-three-vertical" size={14} color={btnColor} />
              {/* <ButtonIcon as={ThreeDotsIcon} /> */}
            </Button>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

VideoCard.propTypes = {
  video: PropTypes.object.isRequired,
};
