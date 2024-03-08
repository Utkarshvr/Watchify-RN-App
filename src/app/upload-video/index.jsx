import {
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  CheckboxIndicator,
  EditIcon,
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  useToast,
} from "@gluestack-ui/themed";
import {
  Select,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import { useUploadVideoData } from "../../context/UploadVideoContext";
import useUploadVideo from "../../hooks/useUploadVideo";
import { Image } from "react-native";
import { Divider } from "@gluestack-ui/themed";
import { useAuthData } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useFetchPlaylists from "../../hooks/useFetchPlaylists";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetFlatList,
  AddIcon,
} from "@gluestack-ui/themed";
import Loading from "../../components/ui/Loading";
import { Checkbox } from "@gluestack-ui/themed";
import { CheckboxIcon } from "@gluestack-ui/themed";
import { CheckboxLabel } from "@gluestack-ui/themed";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckIcon } from "@gluestack-ui/themed";

import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";
import { Icon } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import axiosInstance from "../../utils/axiosInstance";
import { Toast } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { ToastTitle } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { useNotificationAPI } from "../../context/NotificationContext";

function createVideoFormData(values) {
  const formData = new FormData();

  // Append fields to formData
  for (const field in values) {
    console.log(
      typeof values[field],

      "isArray: ",
      Array.isArray(values[field]),
    );

    if (Array.isArray(values[field])) {
      console.log("ARRAYY!!!!");
      console.log(values[field]);
      values[field].forEach((playlistID, index) => {
        console.log(`${field}[${index}]`, playlistID);
        formData.append(`${field}[${index}]`, playlistID);
      });
    } else if (typeof values[field] === "object") {
      console.log(field, values[field]);
      formData.append(field, values[field]?.file);
    } else {
      // For non-array fields, append directly
      formData.append(field, values[field]);
    }
  }
  return formData;
}

export default function UploadVideo() {
  const { user, isAuth, isLoading: isAuthUserLoading } = useAuthData();
  const { openNotification } = useNotificationAPI();

  if (!isAuthUserLoading && !isAuth) {
    openNotification({ title: "Login to upload a video" }, "error");
    return router.canGoBack() ? router.back() : router.replace("/(tabs)/home");
  }
  const { bgColor, textColor } = useBGColor();

  const toast = useToast();

  const { video, thumbnail } = useUploadVideoData();
  const { uploadThumbnail: selectThumbnail } = useUploadVideo();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isVideoPrivate, setIsVideoPrivate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { playlists, isLoading, fetchPlaylists } = useFetchPlaylists();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const [isPlaylistSheetOpen, setIsPlaylistSheetOpen] = useState(false);
  const { showModal, open } = useCreatePlaylistModal();

  useEffect(() => {
    fetchPlaylists(user?._id);
  }, [isPlaylistSheetOpen, open]);

  const handleSelect = async (plyl) => {
    const isSelectedOneAlreadyThere = selectedPlaylists?.some((p) => p === plyl?._id);
    if (isSelectedOneAlreadyThere) setSelectedPlaylists(selectedPlaylists?.filter((p) => p !== plyl?._id));
    else setSelectedPlaylists((prev) => [...prev, plyl]);
  };
  console.log({ video, thumbnail });
  async function uploadVideoToServer() {
    if (!title)
      return toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <Toast nativeID={toastId} action={"info"} variant={"accent"}>
              <VStack space="xs">
                <ToastTitle>{"Video Title is required"}</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    if (!thumbnail || !video)
      return toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <Toast nativeID={toastId} action={"info"} variant={"accent"}>
              <VStack space="xs">
                <ToastTitle>{"Video and Thumbnail are required"}</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("isPublic", !isVideoPrivate);
    formData.append("video", {
      uri: video?.uri,
      name: video?.uri?.split("/")[video?.uri?.split("/")?.length - 1],
      type: `video/${video?.uri?.split(".").pop()}`,
    });
    formData.append("thumbnail", {
      uri: thumbnail?.uri,
      name: thumbnail?.uri?.split("/")[thumbnail?.uri?.split("/")?.length - 1],
      type: `image/${thumbnail?.uri?.split(".").pop()}`,
    });
    selectedPlaylists?.forEach((p, index) => {
      console.log(`selectedPlaylists[${index}]`, p?._id);
      formData.append(`selectedPlaylists[${index}]`, p?._id);
    });

    try {
      setIsUploading(true);
      {
        router.canGoBack() ? router.back() : null;
      }
      // At this point I get an error (and I notice that the request to /video/create didn't even go)
      const { data } = await axiosInstance.post("/video/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("::uploadVideoToServer::", { data });
    } catch (err) {
      // This is the error
      console.log({ err });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Box flex={1} bgColor={bgColor}>
      <Box flex={1} bgColor={bgColor}>
        <Box position="relative">
          <Image
            style={{
              width: "100%",
              height: 160,
            }}
            source={{
              uri: thumbnail?.uri || "",
            }}
          />
          <Box
            position="absolute"
            top={8}
            left={8}
            px={"$2"}
            gap={"$1"}
            rounded={"$sm"}
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            flexDirection="row"
          >
            <Text size="xs">{"Thumbnail"}</Text>
          </Box>
          <Button
            onPress={selectThumbnail}
            position="absolute"
            right={8}
            bottom={8}
            variant="solid"
            action="secondary"
            rounded={"$full"}
            size="sm"
          >
            <ButtonIcon as={EditIcon} />
          </Button>
        </Box>
        <Box p="$4" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box flexDirection="row" gap="$2" alignItems="flex-start">
            <Image width={36} height={36} borderRadius={999} source={{ uri: user?.picture }} />
            <Box>
              <Text size="xs" fontSize={10}>
                {user?.name}
              </Text>
              <Text size="xs" fontSize={10}>
                @{user?.user_handle}
              </Text>
            </Box>
          </Box>
        </Box>

        <Divider />
        <Box p="$4" gap="$2">
          <Input isDisabled={isUploading} variant="underlined" size="sm">
            <InputField placeholder="Write a Video Title" onChangeText={(text) => setTitle(text)} value={title} />
          </Input>
          <Textarea size="sm" isDisabled={isUploading} width="$full">
            <TextareaInput
              value={desc}
              onChangeText={(text) => setDesc(text)}
              placeholder="Write a Description for your video..."
            />
          </Textarea>
        </Box>

        <Divider />
        <Box p="$4" gap="$4">
          <TouchableOpacity onPress={() => setIsPlaylistSheetOpen(true)}>
            <Box alignItems="center" justifyContent="space-between" flexDirection="row">
              <Box flex={0.9} flexDirection="row" gap="$4" alignItems="center">
                <Entypo name="add-to-list" size={16} color={textColor} />
                <Box>
                  <Text size="xs" color="$secondary400">
                    Playlists
                  </Text>

                  {selectedPlaylists?.length > 0 ? (
                    <Text>
                      <Text numberOfLines={1} ellipsizeMode="tail">
                        {selectedPlaylists[0]?.title}
                      </Text>{" "}
                      {selectedPlaylists?.length > 1 ? `and ${selectedPlaylists?.length - 1} more` : null}
                    </Text>
                  ) : (
                    <Text>Add to playlist</Text>
                  )}
                </Box>
              </Box>
              <Entypo name="plus" size={16} color={textColor} />
            </Box>
          </TouchableOpacity>

          <Box alignItems="center" gap="$4" flexDirection="row">
            <Ionicons name={!isVideoPrivate ? "earth-outline" : "lock-closed-outline"} size={16} color={textColor} />
            <Box flex={1}>
              <Text size="xs" color="$secondary400">
                Privacy
              </Text>
              <Select
                isDisabled={isUploading}
                onValueChange={(val) => setIsVideoPrivate(val === "private")}
                selectedValue={isVideoPrivate ? "private" : "public"}
              >
                <SelectTrigger variant="underlined" size="sm">
                  <SelectInput placeholder="Select option" />
                  <SelectIcon>
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Private" value="private" />
                    <SelectItem label="Public" value="public" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onPress={uploadVideoToServer} isDisabled={isUploading} position="fixed" bottom={18} mx={"$3"}>
        {isUploading && <ButtonSpinner />}
        {!isUploading && <ButtonText>Upload</ButtonText>}
      </Button>

      <Actionsheet isOpen={isPlaylistSheetOpen} onClose={() => setIsPlaylistSheetOpen(false)} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$96" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box width={"$full"}>
            <Box py={"$1"} flexDirection="row" alignItems="center" justifyContent="space-between">
              <Text>Add video to...</Text>
              <Button
                onPress={() => {
                  showModal();
                  setIsPlaylistSheetOpen(false);
                }}
                size="xs"
                variant="link"
              >
                <ButtonIcon as={AddIcon} size="sm" />
                <ButtonText>New playlist</ButtonText>
              </Button>
              {/* <CreatePlaylistBtn variant={"outline"} action="secondary" size="xs" rounded={"$3xl"} /> */}
            </Box>
            <Divider />
          </Box>
          {isLoading ? (
            <Loading />
          ) : playlists?.filter((p) => !p?.isDefault)?.length === 0 ? (
            <Box flex={1} alignItems="center" justifyContent="center">
              <Text>You have no playlists! Create one</Text>
            </Box>
          ) : (
            <ActionsheetFlatList
              data={playlists?.filter((p) => !p?.isDefault)}
              my={"$2"}
              keyExtractor={(plyl) => plyl?._id}
              renderItem={({ item: plyl }) => {
                return (
                  <Box mb={"$2"} flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Checkbox
                      onPress={() => handleSelect(plyl)}
                      flex={0.9}
                      aria-label={plyl?.title}
                      size="md"
                      isChecked={selectedPlaylists?.some((p) => p?._id === plyl?._id)}
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
                );
              }}
            />
          )}

          <Box width={"$full"}>
            <Divider />

            <ActionsheetItem onPress={() => setIsPlaylistSheetOpen(false)}>
              <ButtonIcon as={CheckIcon} color="$white" />
              <ActionsheetItemText>Done</ActionsheetItemText>
            </ActionsheetItem>
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
