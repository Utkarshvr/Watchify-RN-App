import { NativeModules, Platform, StatusBar } from "react-native";

import { Box } from "@gluestack-ui/themed";
import useBGColor from "./hooks/useBGColor";
// import Header from "./components/core/Header";
import DeepLink from "./DeepLink";
import CreatePlaylistModal from "./components/modal/CreatePlaylistModal";
import LoadingOverlay from "./components/ui/LoadingOverlay";

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export default function App({ children }) {
  const { bgColor } = useBGColor();

  return (
    <Box flex={1} backgroundColor={bgColor}>
      <DeepLink />
      <StatusBar backgroundColor={bgColor} />
      <CreatePlaylistModal />
      <LoadingOverlay />
      <Box marginTop={STATUSBAR_HEIGHT} flex={1}>
        {/* <Header /> */}
        {children}
      </Box>
    </Box>
  );
}
