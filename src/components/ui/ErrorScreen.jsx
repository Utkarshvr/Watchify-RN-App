import { Box, ButtonText, Text } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import { Button } from "@gluestack-ui/themed";

export default function ErrorScreen({ msg, showRetryBtn, onRetry }) {
  const { bgColor } = useBGColor();

  return (
    <Box alignItems="center" justifyContent="center" flex={1} p="$4" bgColor={bgColor}>
      <Box>
        <Text fontWeight="$bold">Error</Text>
        <Text>{msg}</Text>
      </Box>
      {showRetryBtn && (
        <Button onPress={onRetry}>
          <ButtonText>Retry</ButtonText>
        </Button>
      )}
    </Box>
  );
}
