import { Box, Text } from "@gluestack-ui/themed";
import useBGColor from "../hooks/useBGColor";

export default function studio() {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} backgroundColor={bgColor} p={"$3"}>
      <Text>Studio</Text>
    </Box>
  );
}
