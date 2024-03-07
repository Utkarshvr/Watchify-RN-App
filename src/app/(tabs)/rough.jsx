import { Box, Button, Text, ButtonText } from "@gluestack-ui/themed";
import { Link } from "expo-router";

export default function rough() {
  return (
    <Box flex={1} bgColor="$secondary950">
      <Text>Rough Screen</Text>

      <Link asChild href={"/playlist/HoLfQJpc75QZggiV"}>
        <Button>
          <ButtonText>Open Playlist</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}
