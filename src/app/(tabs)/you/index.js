import { ArrowRightIcon, Box, Button, ButtonIcon, ButtonText, Heading, Text } from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";
import UserAvatar from "../../../components/ui/avatar/UserAvatar";
import { useAuthData } from "../../../context/AuthContext";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import LogoutBtn from "../../../components/Button/LogoutBtn";
import useFetchPlaylists from "../../../hooks/useFetchPlaylists";
import { useEffect } from "react";
import PlaylistCard from "../../../components/card/PlaylistCard";

export default function You() {
  const { bgColor } = useBGColor();
  const { user } = useAuthData();

  function navigateToChannel() {
    router.push(`/channel/${user?._id}`);
  }

  const { fetchPlaylists, playlists } = useFetchPlaylists();

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists(user?._id);
    }
  }, [user]);

  console.log({ playlists: playlists.length });

  return (
    <Box flex={1} backgroundColor={bgColor} p={"$3"} gap={"$5"}>
      <Box flexDirection="row" px={"$1"} justifyContent="space-between" alignItems="center">
        <Box flexDirection="row" gap={"$2"} alignItems="center">
          <UserAvatar size={72} />
          <Box>
            <Heading>{user?.name}</Heading>
            <Box flexDirection="row" gap={"$2"}>
              <Text size="xs">@{user?.user_handle}</Text>
              <Text color="$secondary400" size="xs">
                |
              </Text>
              <TouchableOpacity onPress={navigateToChannel}>
                <Box flexDirection="row" gap={"$0.5"} alignItems="center" justifyContent="center">
                  <Text color="$secondary400" size="xs">
                    View Channel
                  </Text>
                  <ButtonIcon as={ArrowRightIcon} color="$secondary400" size="xs" />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
        <LogoutBtn showText={false} />
      </Box>

      <Box gap="$1">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Heading>Your Playlists</Heading>
          <Button variant="outline" size="xs" action="secondary" rounded={"$3xl"}>
            <ButtonText>View all</ButtonText>
          </Button>
        </Box>
        <Box flexDirection="row" gap={"$1"}>
          <FlatList
            data={playlists.sort((a, b) => b.isDefault - a.isDefault)}
            px={"$1"}
            horizontal
            keyExtractor={(playlist) => playlist?._id}
            renderItem={({ item }) => {
              return <PlaylistCard playlist={item} fillGap />;
            }}
          />
        </Box>
      </Box>

      <Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Heading>Your Videos</Heading>
          <Button variant="outline" size="xs" action="secondary" rounded={"$3xl"}>
            <ButtonText>View all</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
