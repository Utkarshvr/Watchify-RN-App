import { NativeModules, Platform, StatusBar } from "react-native";

import { Box } from "@gluestack-ui/themed";
import useBGColor from "./hooks/useBGColor";

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export default function App({ children }) {
  const { bgColor } = useBGColor();

  return (
    <>
      <StatusBar backgroundColor={bgColor} />

      <Box marginTop={STATUSBAR_HEIGHT} flex={1}>
        {children}
      </Box>
    </>
  );
}
