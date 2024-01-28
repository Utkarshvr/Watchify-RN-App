import { Box, Text } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";

export default function ErrorScreen({ msg }) {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} bgColor={bgColor}>
      <Text fontWeight="$bold">Error</Text>
      <Text>{msg}</Text>
    </Box>
  );
}
