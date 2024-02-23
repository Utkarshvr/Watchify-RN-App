import { Box, Button, ButtonText, FlatList, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import useBGColor from "../hooks/useBGColor";
import { Heading } from "@gluestack-ui/themed";
import Loading from "../components/ui/Loading";
import axiosInstance from "../utils/axiosInstance";
import { Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import SubscribeChannelBtn from "../components/action/SubscribeChannelBtn";

export default function SubscriptionsList() {
  const { bgColor } = useBGColor();

  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadSubscriptions() {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/user/me/subscriptions");
      setSubscriptions(data?.data?.subscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  function navigateToChannel(channelID) {
    router.push(`/channel/${channelID}`);
  }

  if (isLoading) return <Loading />;

  return (
    <Box flex={1} p="$2" bgColor={bgColor}>
      <Box gap={"$2"}>
        <Heading>All Subscriptions</Heading>
        <FlatList
          data={subscriptions}
          keyExtractor={(subscription) => subscription?._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigateToChannel(item?.channel?._id)}>
                <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Box flexDirection="row" gap="$2" alignItems="center">
                    <Image
                      width={40}
                      height={40}
                      source={{ uri: item?.channel?.picture }}
                      style={{ borderRadius: 999 }}
                      alt="Channel"
                    />
                    <Text style={{ fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">
                      {item?.channel?.user_handle}
                    </Text>
                  </Box>
                  <SubscribeChannelBtn channel={item?.channel} />
                </Box>
              </TouchableOpacity>
            );
          }}
        />
      </Box>
    </Box>
  );
}
