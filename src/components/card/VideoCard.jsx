import PropTypes from "prop-types";
import { AvatarImage, Box, Button, ButtonIcon, Image, Text, ThreeDotsIcon } from "@gluestack-ui/themed";
import { formatDistanceToNow } from "date-fns";

export default function VideoCard({ video }) {
  return (
    <Box>
      <Image
        source={{ uri: video?.thumbnail }}
        alt="Thumbnail"
        style={{ width: "100%", height: 230, minHeight: 230, maxHeight: 230 }}
        objectFit="fill"
      />

      <Box p={"$2"} gap={8} flexDirection="row">
        {/* Link to Channel */}
        <Image
          width={36}
          height={36}
          source={{ uri: video?.creator?.picture }}
          alt="You"
          style={{ borderRadius: 999 }}
        />
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
        {/* Action Button */}
        {/* <Button>
          <ButtonIcon as={ThreeDotsIcon} />
        </Button> */}
      </Box>
    </Box>
  );
}

VideoCard.propTypes = {
  video: PropTypes.object.isRequired,
};
