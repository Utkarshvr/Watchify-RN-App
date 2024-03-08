import { Box, Button, Text, ButtonText, ScrollView } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { useState } from "react";
import { RefreshControl } from "react-native";
import axiosInstance from "../../utils/axiosInstance";

export default function rough() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const notifyMe = async () => {
    await axiosInstance.get("/notify-me");
  };
  return (
    <ScrollView
      flex={1}
      bgColor="$secondary950"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text>Rough Screen</Text>

      <Link asChild href={"/playlist/HoLfQJpc75QZggiV"}>
        <Button>
          <ButtonText>Open Playlist</ButtonText>
        </Button>
      </Link>

      <Button onPress={notifyMe}>
        <ButtonText>Notify Me</ButtonText>
      </Button>
    </ScrollView>
  );
}
