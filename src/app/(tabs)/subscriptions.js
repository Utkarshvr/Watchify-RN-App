import { Box } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import SubscriptionProvider from "../../Providers/SubscriptionProvider";
import SubscriptionList from "../../components/subscriptions/SubscriptionList";
import SubscriptionVideos from "../../components/subscriptions/SubscriptionVideos";

export default function subscriptions() {
  const { bgColor } = useBGColor();

  return (
    <SubscriptionProvider>
      <Box flex={1} backgroundColor={bgColor}>
        <SubscriptionList />
        <SubscriptionVideos />
      </Box>
    </SubscriptionProvider>
  );
}
