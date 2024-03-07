import { Box, FlatList, Heading, Text } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import useBGColor from "../../../hooks/useBGColor";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VideoCard from "../../../components/card/VideoCard";
import { config } from "@gluestack-ui/config";
import ShareBtn from "../../../components/action/ShareBtn";
import Loading from "../../../components/ui/Loading";

export default function index() {
  const { playlistID } = useLocalSearchParams();
  const { bgColor } = useBGColor();

  // States
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Error
  const [isError, setIsError] = useState(false);
  const initialErrorState = {
    info: {},
    status_code: 0,
    message: "",
  };
  const [error, setError] = useState(initialErrorState);

  useEffect(() => {
    if (playlistID)
      (async () => {
        setIsLoading(true);
        try {
          const { data } = await axiosInstance.get(`/playlist/${playlistID}`);
          console.log(data);
          setPlaylist(data?.data?.playlist);
        } catch (error) {
          console.log(error);
          setIsError(true);
          setError({
            info: error?.response?.data,
            status_code: error?.response?.data?.statusCode,
            message: error?.response?.data?.message,
          });
        } finally {
          setIsLoading(false);
        }
      })();
  }, [playlistID]);

  if (isLoading)
    return (
      <Box flex={1} bgColor={bgColor}>
        <Loading />
      </Box>
    );
  if (isError)
    return (
      <Box flex={1} bgColor={bgColor}>
        <Heading>Error: {error?.status_code}</Heading>
        <Text fontWeight="$bold">{error?.message}</Text>
      </Box>
    );

  return (
    <Box flex={1} bgColor={bgColor} p={"$4"}>
      <Box gap="$4">
        <Image
          source={
            playlist?.videos[0]?.thumbnail
              ? { uri: playlist?.videos[0]?.thumbnail }
              : require("../../../assets/no-thumbnail.jpg")
          }
          style={{ width: "100%", height: 200, borderRadius: 16 }}
          alt="Playlist Image"
        />
        <Box gap="$1">
          <Heading>{playlist?.title}</Heading>
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Text size="xs">{playlist?.owner?.name}</Text>
              <Box flexDirection="row" alignItems="center" gap={"$2"}>
                <Text size="xs" color="$secondary400">
                  {playlist?.videos?.length} {playlist?.videos?.length === 1 ? "video" : "videos"}
                </Text>
                <Box flexDirection="row" alignItems="center" gap="$1" justifyContent="center">
                  <Ionicons
                    name={!playlist?.isPrivate ? "earth-outline" : "lock-closed-outline"}
                    size={12}
                    color={config.tokens.colors.secondary400}
                  />
                  <Text size="xs" color="$secondary400">
                    {playlist?.isPrivate ? "Private" : "Public"}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box flexDirection="row" gap="$2">
              <ShareBtn link={`${process.env.EXPO_PUBLIC_WEBSITE_BASE_URL}/playlist/${playlist?._id}`} hideBtnText />
            </Box>
          </Box>
        </Box>
        <Box>
          <FlatList
            data={playlist?.videos}
            keyExtractor={(vid) => vid?._id}
            renderItem={({ item }) => <VideoCard video={item} usage={"list"} size="xs" />}
          />
        </Box>
      </Box>
    </Box>
  );
}
