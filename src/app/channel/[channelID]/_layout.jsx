import { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import axiosInstance from "../../../utils/axiosInstance";
import useBGColor from "../../../hooks/useBGColor";
import Loading from "../../../components/ui/Loading";
import { Box, Button, ButtonIcon, ChevronRightIcon, Heading, Image, LinkText, Text } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinkSheet from "../../../components/actionsheet/LinkSheet";
import SubscribeChannelBtn from "../../../components/action/SubscribeChannelBtn";
import ChannelNavigator from "../../../components/Navigators/ChannelNavigator";

export default function ChannelDetails() {
  const { channelID } = useLocalSearchParams();

  const [channelInfo, setChannelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLinkSheetOpen, setIsLinkSheetOpen] = useState(false);

  const { bgColor } = useBGColor();

  const loadChannel = async () => {
    if (isLoading || !channelID) return;

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/channel/${channelID}`);
      console.log(data);

      setChannelInfo(data?.channel);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDescScreen = () => {
    router.push({
      pathname: "/description",
      params: {
        desc: channelInfo?.desc,
      },
    });
  };

  useEffect(() => {
    if (channelID) loadChannel();
  }, [channelID]);

  console.log({ channelInfo });

  if (isLoading || !channelInfo) return <Loading />;

  return (
    <>
      <Box flex={1} bgColor={bgColor}>
        {/* banner image */}
        {channelInfo?.banner_image && (
          <Image
            source={{ uri: channelInfo?.banner_image }}
            objectFit="contain"
            width={Dimensions.get("window").width}
            height={120}
            alt="Banner Image"
          />
        )}

        {/* Channel Info Avatar, Name, (@handle | No. of Subscribers | No. of Videos), Descrp (Max Lines: 2), Links (Max: 1) */}
        <Box gap={"$1"} p="$4">
          <Box gap={"$1"} justifyContent="center" alignItems="center">
            {/* Touch to see the image in zoom */}
            <TouchableOpacity>
              <Image
                source={{ uri: channelInfo?.picture || "" }}
                borderRadius={999}
                width={56}
                height={56}
                alt="User Avatar"
              />
            </TouchableOpacity>
            <Heading>{channelInfo?.name}</Heading>
            <Text size="sm" color="$secondary300">
              {`@${channelInfo?.user_handle}`} | {`${channelInfo?.subscribers_count} subscribers`}
            </Text>
            <TouchableOpacity onPress={openDescScreen}>
              <Box flexDirection="row" alignItems="center" gap="$1">
                <Text size="sm" numberOfLines={1} color="$secondary300">
                  {/* {channelInfo?.desc} */}
                  {channelInfo?.desc?.replace(/\n/g, " ")}
                </Text>
                <Button variant="link" action="secondary">
                  <ButtonIcon as={ChevronRightIcon} />
                </Button>
              </Box>
            </TouchableOpacity>
            {/* Links */}
            {channelInfo?.links?.length > 0 && (
              <TouchableOpacity onPress={() => setIsLinkSheetOpen(true)}>
                <Box flexDirection="row" alignItems="center" gap="$1">
                  <Text size="xs">
                    {channelInfo?.links?.length === 1 ? (
                      <Link href={channelInfo?.links[0]?.url}>
                        <LinkText>{channelInfo?.links[0]?.url}</LinkText>
                      </Link>
                    ) : (
                      <>
                        <Link isExternal href={channelInfo?.links[0]?.url}>
                          <LinkText size="xs">
                            {channelInfo?.links[0]?.url?.replace(/^https?:\/\/(www\.)?/, "")}
                          </LinkText>
                        </Link>{" "}
                        <Text size="xs">
                          and {channelInfo?.links?.length - 1} more{" "}
                          {channelInfo?.links?.length - 1 === 1 ? "link" : "links"}
                        </Text>
                      </>
                    )}
                  </Text>
                </Box>
              </TouchableOpacity>
            )}
          </Box>
        </Box>

        {/* Subscriber Btn */}
        <SubscribeChannelBtn channel={channelInfo} />

        {/* Tabs: (Videos, Playlist) */}
        <ChannelNavigator />
      </Box>
      <LinkSheet links={channelInfo?.links} isLinkSheetOpen={isLinkSheetOpen} setIsLinkSheetOpen={setIsLinkSheetOpen} />
    </>
  );
}
