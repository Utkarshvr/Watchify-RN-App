import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { SubscriptionAPIContext, SubscriptionDataContext } from "../context/SubscriptionContext";

const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    if (subscriptions?.length > 0) {
      const allVideos = [];
      subscriptions?.map(async ({ channel }) => {
        try {
          const url = `/channel/${channel?._id}/videos`;
          const { data } = await axiosInstance.get(url);

          allVideos.push(...data?.videos);
          setVideos([...allVideos]);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [subscriptions]);

  return (
    <SubscriptionDataContext.Provider value={{ subscriptions, isLoading, videos }}>
      <SubscriptionAPIContext.Provider value={{}}>{children}</SubscriptionAPIContext.Provider>
    </SubscriptionDataContext.Provider>
  );
};

export default SubscriptionProvider;
