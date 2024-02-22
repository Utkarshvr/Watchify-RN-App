import { Image } from "react-native";
import { useSubscriptionData } from "../../context/SubscriptionContext";
import { Box, Button, ButtonText, FlatList, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import useBGColor from "../../hooks/useBGColor";

export default function SubscriptionList() {
  const { subscriptions } = useSubscriptionData();
  const { bgColor } = useBGColor();

  return (
    <Box flexDirection="row" position="relative">
      <FlatList
        data={subscriptions}
        px={"$3"}
        horizontal
        keyExtractor={(subscription) => subscription?._id}
        renderItem={({ item }) => {
          console.log({ uri: item?.channel?.picture });
          return (
            <TouchableOpacity>
              <Box maxWidth={48} mr={12} alignItems="center">
                <Image
                  width={48}
                  height={48}
                  source={{ uri: item?.channel?.picture }}
                  style={{ borderRadius: 999 }}
                  alt="Channel"
                />
                <Text style={{ fontSize: 10 }} numberOfLines={1} ellipsizeMode="middle" color="$secondary400">
                  {item?.channel?.user_handle}
                </Text>
              </Box>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        style={{ position: "absolute", top: 0, right: 10 }}
        bgColor={bgColor}
        height="$full"
        width={"$12"}
        variant="link"
      >
        <ButtonText>All</ButtonText>
      </Button>
    </Box>
  );
}
