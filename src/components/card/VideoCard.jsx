import PropTypes from "prop-types";
import { Box, Button, Image, Text } from "@gluestack-ui/themed";

import { formatDistanceToNow } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import useBGColor from "../../hooks/useBGColor";
import { config } from "@gluestack-ui/config";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function VideoCard({ video }) {
  const { textColor } = useBGColor();

  const initialColor = config.tokens.colors.secondary400;
  const [btnColor, setBtnColor] = useState(initialColor);

  function navigateToVideo() {
    router.push(`video/${video?.videoID}`);
  }

  function navigateToChannel() {
    router.push(`channel/${video?.creator?._id}`);
  }

  return (
    <TouchableOpacity onPress={navigateToVideo}>
      <Box flex={1}>
        <Image
          source={{ uri: video?.thumbnail }}
          alt="Thumbnail"
          style={{ width: "100%", height: 230, minHeight: 230, maxHeight: 230 }}
          objectFit="fill"
          flex={1}
        />

        <Box flex={1} p={"$2"} gap={8} flexDirection="row">
          {/* Link to Channel */}
          <TouchableOpacity onPress={navigateToChannel}>
            <Image
              width={36}
              height={36}
              source={{ uri: video?.creator?.picture }}
              alt="You"
              style={{ borderRadius: 999 }}
            />
          </TouchableOpacity>
          <Box flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box gap={4}>
              <Text>{video?.title}</Text>
              <Text size="xs" color="$secondary400">
                {video?.creator?.name}
                {" | "}
                {video?.views_count ? video?.views_count + " views" : null}
                {" | "}
                {video?.createdAt && formatDistanceToNow(video?.createdAt, { addSuffix: true })}
              </Text>
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
