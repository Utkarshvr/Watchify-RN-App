import { Box, Text } from "@gluestack-ui/themed";
import React from "react";
import useBGColor from "../../hooks/useBGColor";
import NotificationList from "../../components/list/NotificationList";

export default function NotificationScreen() {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} p="$2" bgColor={bgColor}>
      <Text>Notifications</Text>
      <NotificationList />
    </Box>
  );
}
