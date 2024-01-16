import { Box, Heading, Image } from "@gluestack-ui/themed";

// eslint-disable-next-line no-undef
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || "Watchify";

export default function Logo({ showText = false }) {
  return (
    <Box flexDirection="row" gap="$2" p="$2" alignItems="center" justifyContent="center">
      {/* eslint-disable-next-line no-undef */}
      <Image source={require("../../assets/icon.png")} width={32} height={32} alt="Logo" />
      {showText && <Heading>{APP_NAME}</Heading>}
    </Box>
  );
}
