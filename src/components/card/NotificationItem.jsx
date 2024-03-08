import { Box, Text } from "@gluestack-ui/themed";
import notificationTypes from "../../constants/notificationTypes";
import NotificationIcon from "../icon/NotificationIcon";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function NotificationItem({ notification }) {
  let title,
    description,
    imageSrc,
    avatar,
    isLinkRequired,
    link_href = null;

  console.log(notification);

  avatar = <NotificationIcon severity={notification?.severity} />;

  switch (notification?.notificationType) {
    case notificationTypes.videoUpload.success():
      title = notification?.payload?.video?.title + ": " + "Uploaded";
      description = new Date(notification?.createdAt).toLocaleString();
      imageSrc = notification?.payload?.video?.thumbnail;
      link_href = `/video/${notification?.payload?.video?.videoID}`;
      isLinkRequired = true;

      break;
    case notificationTypes.videoUpload.failed():
      title = notification?.payload?.video?.title + ": " + "Failed";
      description = new Date(notification?.createdAt).toLocaleString();
      isLinkRequired = false;

      break;

    default:
      title = notification?.payload?.video?.title + ": " + "Uploading...";
      description = new Date(notification?.createdAt).toLocaleString();
      isLinkRequired = false;

      break;
  }

  const content = (
    <Box mb="$4" flex={1} width="$full" flexDirection="row" justifyContent="center" alignItems="flex-start">
      <Box flex={1} flexDirection="row" gap="$2" alignItems="center">
        {avatar}
        <Box flex={1}>
          <Text size="xs">{title} </Text>
          <Text size="xs" fontSize={10} color="$secondary400">
            {description}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" gap={"$2"} alignItems="center">
        {imageSrc && <Image source={{ uri: imageSrc }} width={100} height={50} borderRadius={8} alt="video-img" />}
        {/* {isUnread && (
            <Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "100%",
                background: "#fff",
              }}
            />
          )} */}
      </Box>
    </Box>
  );
  return isLinkRequired ? (
    <TouchableOpacity flex={1} onPress={() => router.push(link_href)}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
}
