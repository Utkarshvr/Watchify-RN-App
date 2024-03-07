import { Box } from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";
import { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import Loading from "../../../components/ui/Loading";
import { FlatList } from "@gluestack-ui/themed";
import PlaylistCard from "../../../components/card/PlaylistCard";
import useFetchPlaylists from "../../../hooks/useFetchPlaylists";
import { Text } from "@gluestack-ui/themed";

export default function PlaylistsTab() {
  const { channelID } = useGlobalSearchParams();
  const { bgColor } = useBGColor();

  const { playlists, isLoading: isPLaylistLoading, fetchPlaylists, reset: resetPLaylists } = useFetchPlaylists();

  console.log("::PLAYLIST_TAB::", { channelID, playlists });

  useEffect(() => {
    if (channelID) {
      fetchPlaylists(channelID);
    }
  }, [channelID]);

  return (
    <Box flex={1} bgColor={bgColor}>
      <Box width={"$full"} p={"$2"} minHeight={"$24"}>
        {isPLaylistLoading ? (
          <Loading />
        ) : playlists?.length === 0 ? (
          <Text>This Channel has no playlists yet!</Text>
        ) : (
          <FlatList
            data={playlists.sort((a, b) => b.isDefault - a.isDefault)}
            keyExtractor={(playlist) => playlist?._id}
            renderItem={({ item }) => {
              return <PlaylistCard playlist={item} fillGap horizontal />;
            }}
          />
        )}
      </Box>
    </Box>
  );
}
