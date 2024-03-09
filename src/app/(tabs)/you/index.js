import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FlatList,
  Heading,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";
import UserAvatar from "../../../components/ui/avatar/UserAvatar";
import { useAuthData } from "../../../context/AuthContext";
import { router } from "expo-router";
import LogoutBtn from "../../../components/Button/LogoutBtn";
import useFetchPlaylists from "../../../hooks/useFetchPlaylists";
import { useEffect, useState } from "react";
import PlaylistCard from "../../../components/card/PlaylistCard";
import axiosInstance from "../../../utils/axiosInstance";
import VideoCard from "../../../components/card/VideoCard";
import { TouchableOpacity } from "react-native";
import CreatePlaylistBtn from "../../../components/Button/CreatePlaylistBtn";
import { useCreatePlaylistModal, useCreatePlaylistModalData } from "../../../context/CreatePlaylistModalContext";
import Loading from "../../../components/ui/Loading";

export default function You() {
  const { bgColor } = useBGColor();
  const { user } = useAuthData();

  const { open } = useCreatePlaylistModal();
  const { isNewPlaylistCreated } = useCreatePlaylistModalData();

  const [videos, setVideos] = useState([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  console.log("::YOU::", { myVids: videos });

  function navigateToChannel() {
    router.push(`/channel/${user?._id}`);
  }

  const { playlists, isLoading: isPLaylistLoading, fetchPlaylists, reset: resetPLaylists } = useFetchPlaylists();

  const loadMyVideos = async (userID) => {
    setIsVideoLoading(true);

    try {
      const { data } = await axiosInstance.get(`channel/${userID}/videos`);
      setVideos(data?.videos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsVideoLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists(user?._id);
      loadMyVideos(user?._id);
    } else {
      setVideos([]);
      resetPLaylists();
    }
  }, [user, open, isNewPlaylistCreated]);

  return (
    <ScrollView flex={1} backgroundColor={bgColor} p={"$3"}>
      <Box mb="$5" flexDirection="row" px={"$1"} justifyContent="space-between" alignItems="center">
        <Box flex={1} flexDirection="row" gap={"$2"} alignItems="center">
          <UserAvatar size={54} />
          <Box>
            <Text fontWeight="$extrabold" fontSize={16}>{user?.name}</Text>
            <Box flexWrap="wrap" flexDirection="row" gap={"$1"}>
              <Text size="xs" fontSize={10}>@{user?.user_handle}</Text>
              <Box flexDirection="row" gap="$1">
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
        </Box>
        <LogoutBtn showText={false} />
      </Box>

      <Box mb="$5" gap="$1">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Heading>Your Playlists</Heading>
          {/* <Button variant="outline" size="xs" action="secondary" rounded={"$3xl"}>
            <ButtonText>View all</ButtonText>
          </Button> */}
          <CreatePlaylistBtn variant={"outline"} action="secondary" size="xs" rounded={"$3xl"} />
        </Box>
        <Box gap={"$1"} width={"$full"} minHeight={"$24"}>
          {isPLaylistLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={playlists.sort((a, b) => b.isDefault - a.isDefault)}
              px={"$1"}
              horizontal
              keyExtractor={(playlist) => playlist?._id}
              renderItem={({ item }) => {
                return <PlaylistCard playlist={item} fillGap />;
              }}
            />
          )}
        </Box>
      </Box>

      <Box flex={1}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Heading>Your Videos</Heading>
          {/* <Button variant="outline" size="xs" action="secondary" rounded={"$3xl"}>
            <ButtonText>View all</ButtonText>
          </Button> */}
        </Box>
        <Box width={"$full"} minHeight={"$24"}>
          {isVideoLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={videos}
              mb={"$5"}
              keyExtractor={(vid) => vid?._id}
              renderItem={({ item }) => {
                return <VideoCard video={item} size="xs" usage={"my-videos"} />;
              }}
            />
          )}
        </Box>
      </Box>
    </ScrollView>
  );
}
