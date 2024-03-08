import { Button, ButtonIcon, BellIcon, Badge, BadgeText, Text, Box } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { useAuthData } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNotificationData } from "../../context/NotificationContext";

export default function UserNotificationBtn() {
  const { user } = useAuthData();
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const { fetchAgain } = useNotificationData();

  useEffect(() => {
    if (user?._id) {
      (async () => {
        try {
          const { data } = await axiosInstance.get("/user/me/notifications?isRead=false");

          setUnreadNotifications(data?.data?.notifications);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user?._id, fetchAgain]);

  return (
    <Button
      onPress={() => {
        setUnreadNotifications([]);
        router.push("/notifications");
      }}
      rounded="$full"
      size="xl"
      variant="link"
      action="secondary"
      position="relative"
    >
      <ButtonIcon as={BellIcon} />
      {unreadNotifications?.length > 0 && (
        <Box
          width={"$4"}
          height={"$4"}
          position="absolute"
          top={8}
          right={-4}
          bgColor="$red800"
          style={{ borderRadius: 999 }}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={12} style={{ lineHeight: 16 }} fontWeight="$bold">
            {unreadNotifications?.length}
          </Text>
        </Box>
      )}
    </Button>
  );
}
