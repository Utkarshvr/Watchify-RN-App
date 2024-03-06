import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import useSubscribeChannel from "../../hooks/useSubscribeChannel";
import { useAuthData } from "../../context/AuthContext";

export default function SubscribeChannelBtn({ CustomButton, channel }) {
  const { isSubscribed, subscribeChannel, subscribersCount, isSubscribing } = useSubscribeChannel({ channel });
  const { user, isAuth } = useAuthData();
  console.log({ user, channel });

  if (!isAuth) return;

  // if it's your channel, don't show the button to subscribe
  if (user?._id === channel?._id) return;

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
