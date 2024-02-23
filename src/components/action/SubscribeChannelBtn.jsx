import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import useSubscribeChannel from "../../hooks/useSubscribeChannel";

export default function SubscribeChannelBtn({ CustomButton, channel }) {
  const { isSubscribed, subscribeChannel, subscribersCount, isSubscribing } = useSubscribeChannel({ channel });
  console.log({ isSubscribed, subscribersCount });
  return (
    <>
      {CustomButton ? (
        CustomButton
      ) : (
        <Button
          onPress={subscribeChannel}
          variant="outline"
          action={isSubscribed ? "secondary" : "primary"}
          size="xs"
          rounded={"$2xl"}
        >
          {isSubscribing ? (
            <ButtonSpinner />
          ) : isSubscribed ? (
            <ButtonText>Unsubscribe</ButtonText>
          ) : (
            <ButtonText>Subscribe</ButtonText>
          )}
        </Button>
      )}
    </>
  );
}
