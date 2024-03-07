import { Box, Text } from "@gluestack-ui/themed";
import { Image, TouchableOpacity } from "react-native";
import IconBtn from "../Button/IconBtn";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PlaylistCard({ playlist, fillGap }) {
  function navigateToPlaylist(playlistID) {
    router.push(`/playlist/${playlistID}`);
  }
  return (
    <TouchableOpacity onPress={() => navigateToPlaylist(playlist?._id)}>
      <Box mr={fillGap && "$2"} maxWidth={140}>
        <Box position="relative">
          {playlist?.videos[0]?.thumbnail ? (
            <Image
              source={{ uri: playlist?.videos[0]?.thumbnail }}
              alt="Thumbnail"
              style={{ width: "100%", height: 80, minWidth: 140 }}
            />
          ) : (
            <Box style={{ height: 80, width: 140 }} />
          )}
          {playlist?.isDefault || playlist?.videos?.length === 0 ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width={"100%"}
              height={"100%"}
              alignItems="center"
              justifyContent="center"
              style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            >
              <Box alignItems="center" justifyContent="center">
                {playlist?.isDefault && playlist?.title === "Liked Videos" ? (
                  <Ionicons name={"thumbs-up"} size={20} color={"#fff"} />
                ) : (
                  <Entypo
                    name={playlist?.isDefault && playlist?.title === "Watch Later" ? "clock" : "list"}
                    size={20}
                    color={"#fff"}
                  />
                )}
                <Text>{playlist?.videos?.length}</Text>
              </Box>
            </Box>
          ) : (
            <Box
              position="absolute"
              bottom={2}
              right={2}
              px={"$2"}
              gap={"$1"}
              rounded={"$sm"}
              alignItems="center"
              justifyContent="center"
              style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              flexDirection="row"
            >
              <Entypo name={"list"} size={12} color={"#fff"} />

              <Text size="xs"> {playlist?.videos?.length}</Text>
            </Box>
          )}
        </Box>

        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {playlist?.title}
            </Text>
            <Text size="xs" color="$secondary400">
              {playlist?.isPrivate ? "Private" : "Public"}
            </Text>
          </Box>
          <IconBtn variant={"link"} iconSize={12} name={"dots-three-vertical"} iconType="Entypo" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
