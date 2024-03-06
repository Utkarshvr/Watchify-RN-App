import { ArrowRightIcon, Box, Button, ButtonIcon, ButtonText, FlatList, Heading, Text } from "@gluestack-ui/themed";
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

export default function You() {
  const { bgColor } = useBGColor();
  const { user } = useAuthData();

  const [videos, setVideos] = useState([]);

  function navigateToChannel() {
    router.push(`/channel/${user?._id}`);
  }

  const { fetchPlaylists, playlists } = useFetchPlaylists();

  const loadMyVideos = async (userID) => {
    // setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(`channel/${userID}/videos`);
      setVideos(data?.videos);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists(user?._id);
      loadMyVideos(user?._id);
    }
  }, [user]);

  // console.log({ my_videos: videos });

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
        <Box gap={"$1"}>
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

      <Box flex={1}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Heading>Your Videos</Heading>
          {/* <Button variant="outline" size="xs" action="secondary" rounded={"$3xl"}>
            <ButtonText>View all</ButtonText>
          </Button> */}
        </Box>
        <Box gap={"$1"}>
          <FlatList
            data={videos}
            mb={"$5"}
            keyExtractor={(vid) => vid?._id}
            renderItem={({ item }) => {
              return <VideoCard video={item} size="xs" usage={"my-videos"} />;
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
