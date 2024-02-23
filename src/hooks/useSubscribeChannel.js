import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useSubscribeChannel({ channel }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [isSubscribing, setIsSubscribing] = useState(false);

  //   console.log({
  //     // CHANNEL_IN_HOOK: channel,
  //     isSubscribed: channel?.isSubscribed,
  //     subscribers_count: channel?.subscribers_count,
  //   });

  useEffect(() => {
    if (channel) {
      console.log({ channel });
      setIsSubscribed(channel?.isSubscribed);
      setSubscribersCount(channel?.subscribers_count);
    }
  }, [channel]);

  const subscribeChannel = async () => {
    const channelID = channel?._id;

    if (!channelID) throw new Error("Channel ID is not present");

    setIsSubscribing(true);
    try {
      const { data } = await axiosInstance.post(`/channel/${channelID}/subscribe`);
      //   console.log(data?.isSubscribed);
      setIsSubscribed(data?.isSubscribed);
      setSubscribersCount((prev) => (data?.isSubscribed ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setIsSubscribing(false);
    }
  };

  return { subscribeChannel, isSubscribing, isSubscribed, subscribersCount };
}
