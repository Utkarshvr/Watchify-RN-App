import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CopyIcon,
  Divider,
  InputField,
  ScrollView,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import useBGColor from "../hooks/useBGColor";
import { useAuthAPI, useAuthData } from "../context/AuthContext";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNotificationAPI } from "../context/NotificationContext";
import { getUserRoute } from "../utils/api/api.routes";

export default function ChannelSettingsScreen() {
  const { bgColor } = useBGColor();
  const { user } = useAuthData();
  const { setAuthToken, setUser, setIsLoading } = useAuthAPI();
  const { openNotification } = useNotificationAPI();

  // User Info:
  const [isModified, setIsModified] = useState(false);
  const [userPicture, setUserPicture] = useState({ uri: "" });
  const [userBanner, setUserBanner] = useState({ uri: "" });
  const [userName, setUserName] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [links, setLinks] = useState([]);

  const channelURLLink = `${process.env.EXPO_PUBLIC_WEBSITE_BASE_URL}/channel/${user?.channelID}`;
  const handleCopyChannelURLLink = async () => await Clipboard.setStringAsync(channelURLLink);

  useEffect(() => {
    if (user?._id) {
      setUserName(user?.name);
      setUserHandle(user?.user_handle);
      setUserDesc(user?.desc);
      // setUserPicture({ uri: user?.picture });
      // setUserBanner({ uri: user?.banner_image || "" });
      setLinks(user?.links);
      setIsModified(false);
    }
  }, [user]);

  const selectBannerImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsModified(true);
      const img = result.assets[0];
      setUserBanner(img);
    }
  };
  const selectUserPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsModified(true);
      const img = result.assets[0];
      setUserPicture(img);
    }
  };

  async function customizeChannel() {
    try {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("user_handle", userHandle);
      formData.append("desc", userDesc);

      if (userPicture?.uri)
        formData.append("user_picture", {
          uri: userPicture?.uri,
          name: userPicture?.uri?.split("/")[userPicture?.uri?.split("/")?.length - 1],
          type: `image/${userPicture?.uri?.split(".").pop()}`,
        });
      if (userBanner?.uri)
        formData.append("banner_image", {
          uri: userBanner?.uri,
          name: userBanner?.uri?.split("/")[userBanner?.uri?.split("/")?.length - 1],
          type: `image/${userBanner?.uri?.split(".").pop()}`,
        });

      await axiosInstance.post("/user/me/customize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      openNotification({ title: "Channel Changes are completed" });

      setIsLoading(true);
      const { data: userData } = await axiosInstance.get(getUserRoute);
      console.log({ userData });

      if (userData) {
        setIsLoading(false);
        setUser(userData?.data?.user);
      } else {
        setIsLoading(false);
        setUser(null);
        setAuthToken(null);
      }
    } catch (error) {
      console.log(error);
      openNotification({ title: error?.message }, "error");
    }
  }

  return (
    <Box bgColor={bgColor} flex={1}>
      <ScrollView mb={"$10"} bgColor={bgColor} flex={1}>
        <Box position="relative">
          <Image
            source={
              userBanner?.uri
                ? { uri: userBanner?.uri }
                : user?.banner_image
                  ? { uri: user?.banner_image }
                  : require("../assets/no-banner.jpg")
            }
            style={{ width: "100%", height: 100 }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="$full"
            height="$full"
            alignItems="center"
            justifyContent="center"
          >
            <Box position="relative" alignItems="center" justifyContent="center">
              <Image
                source={{ uri: userPicture?.uri || user?.picture }}
                style={{ width: 72, height: 72, borderRadius: 999 }}
              />

              {/* For User Picture */}
              <Box
                position="absolute"
                alignItems="center"
                justifyContent="center"
                style={{ width: 72, height: 72, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 999 }}
              >
                <TouchableOpacity onPress={selectUserPicture}>
                  <Ionicons name={"camera-outline"} size={56} color={"#ffffff"} />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
          {/* For Banner */}
          <Box position="absolute" top={"$4"} right={"$4"}>
            <TouchableOpacity onPress={selectBannerImg}>
              <Ionicons name={"camera-outline"} size={24} color={"#ffffff"} />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box mb="$5">
          <Box p="$2">
            <Text>Name</Text>
            <Input isDisabled={false} variant="underlined" size="sm">
              <InputField
                placeholder="Luke..."
                onChangeText={(text) => {
                  setIsModified(true);
                  setUserName(text);
                }}
                value={userName}
              />
            </Input>
          </Box>
          <Box p="$2">
            <Text>Handle</Text>
            <Input isDisabled={false} variant="underlined" size="sm">
              <InputField
                placeholder="luke_belmar..."
                onChangeText={(text) => {
                  setIsModified(true);
                  setUserHandle(text);
                }}
                value={userHandle}
              />
            </Input>
          </Box>
          <Box gap="$1" p="$2">
            <Box flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box flex={1} gap="$1">
                <Text>Channel URL</Text>
                <Text size="xs" color="$secondary400">
                  {channelURLLink}
                </Text>
              </Box>
              <Button onPress={handleCopyChannelURLLink} variant="link" size="xl" action="secondary">
                <ButtonIcon as={CopyIcon} />
              </Button>
            </Box>
            <Divider />
          </Box>
          <Box p="$2" gap="$2">
            <Text>Description</Text>
            <Textarea height={"$72"} size="sm" isDisabled={false} width="$full">
              <TextareaInput
                value={userDesc}
                onChangeText={(text) => {
                  setIsModified(true);
                  setUserDesc(text);
                }}
                placeholder="Write a Description for your channel"
              />
            </Textarea>
          </Box>
        </Box>
      </ScrollView>
      <Box
        position="absolute"
        bottom={!isModified ? -100 : "$4"}
        width="$full"
        justifyContent="center"
        alignItems="center"
      >
        <Button onPress={customizeChannel} isDisabled={!isModified}>
          <ButtonText>Save Changes</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
