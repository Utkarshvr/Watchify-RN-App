import { Box, Divider, Heading, Text } from "@gluestack-ui/themed";
import useBGColor from "../hooks/useBGColor";

export default function Home() {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} backgroundColor={bgColor} p={"$3"}>
      <Heading>All</Heading>
      <Divider />
      <Box gap={8} mt={"$2"}>
        <Text>HOME</Text>
      </Box>
    </Box>
  );
}
