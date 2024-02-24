import { Box, Text } from "@gluestack-ui/themed";
import useBGColor from "../../../hooks/useBGColor";

export default function You() {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} backgroundColor={bgColor} p={"$3"}>
      <Text>You</Text>
    </Box>
  );
}
