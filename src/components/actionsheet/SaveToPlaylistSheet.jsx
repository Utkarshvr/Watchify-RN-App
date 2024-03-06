import { Ionicons } from "@expo/vector-icons";
import { ActionsheetFlatList, ActionsheetIcon, AddIcon, ButtonText, Divider, FlatList } from "@gluestack-ui/themed";
import { CheckIcon } from "@gluestack-ui/themed";
import { Button, ButtonIcon, CopyIcon, Heading, Text } from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
} from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import useBGColor from "../../hooks/useBGColor";
import { Checkbox } from "@gluestack-ui/themed";
import { CheckboxIndicator } from "@gluestack-ui/themed";
import { CheckboxIcon } from "@gluestack-ui/themed";
import { CheckboxLabel } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useVideoData } from "../../context/VideoContext";
import Loading from "../ui/Loading";
import CreatePlaylistBtn from "../Button/CreatePlaylistBtn";
import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";

export default function SaveToPlaylistSheet({ isSheetOpen, setIsSheetOpen }) {
  // HOOKS
  const { textColor } = useBGColor();
  const { videoUUID } = useVideoData();

  const handleClose = () => setIsSheetOpen(false);

  // States
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMyPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/user/me/playlists");

      const playlistsExcludingLikedVideos = data?.playlists
        ?.filter((list) => list?.title !== "Liked Videos")
        .sort((a, b) => b.isDefault - a.isDefault);

      setPlaylists(playlistsExcludingLikedVideos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMyPlaylists();
  }, [isSheetOpen]);

  // THE LOGIC
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
    if (playlists?.length > 0) {
      const playlistsContainingGivenVideo = playlists
        ?.map((playlist) =>
          playlist?.videos?.some((video) => video?._id?.toString() === videoUUID) ? playlist?._id : null,
        )
        ?.filter(Boolean);

      // Check if selectedPlaylists are different before updating
      if (JSON.stringify(playlistsContainingGivenVideo) !== JSON.stringify(selectedPlaylists)) {
        setSelectedPlaylists(playlistsContainingGivenVideo);
        // setInitialselectedPlaylists(playlistsContainingGivenVideo);
      }
    }
  }, [playlists]);

  const handleSelect = async (playlistID) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post(`playlist/${playlistID}/toggle-video?video=${videoUUID}`);
      // console.log(data?.message);
      // success(data?.message);
      console.log("::handleSelect::", data);

      const isSelectedOneAlreadyThere = selectedPlaylists?.some((p) => p === playlistID);
      if (isSelectedOneAlreadyThere) setSelectedPlaylists(selectedPlaylists?.filter((p) => p !== playlistID));
      else setSelectedPlaylists((prev) => [...prev, playlistID]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { showModal, open } = useCreatePlaylistModal();
  console.log({ playlists: playlists?.length });
  return (
    <Box>
      <Actionsheet isOpen={isSheetOpen} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$96" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box width={"$full"}>
            <Box py={"$1"} flexDirection="row" alignItems="center" justifyContent="space-between">
              <Text>Save video to...</Text>
              <Button
                onPress={() => {
                  showModal();
                  handleClose();
                }}
                size="xs"
                variant="link"
              >
                <ButtonIcon as={AddIcon} size="sm" />
                <ButtonText>New playlist</ButtonText>
              </Button>
            </Box>
            <Divider />
          </Box>

          <ActionsheetFlatList
            data={playlists}
            // py={"$2"}
            my={"$2"}
            keyExtractor={(plyl) => plyl?._id}
            renderItem={({ item: plyl }) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(plyl?._id)}>
                  <Box mb={"$2"} flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Checkbox
                      flex={0.9}
                      aria-label={plyl?.title}
                      size="md"
                      isChecked={selectedPlaylists?.some((e) => e === plyl?._id)}
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>{plyl?.title}</CheckboxLabel>
                    </Checkbox>

                    <Ionicons
                      name={!plyl?.isPrivate ? "earth-outline" : "lock-closed-outline"}
                      size={16}
                      color={textColor}
                    />
                  </Box>
                </TouchableOpacity>
              );
            }}
          />

          <Box width={"$full"}>
            <Divider />

            <ActionsheetItem onPress={handleClose}>
              <ButtonIcon as={CheckIcon} color="$white" />
              <ActionsheetItemText>Done</ActionsheetItemText>
            </ActionsheetItem>
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
