import { useColorScheme } from "react-native";
import { config as defaultConfig } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";

import { createProvider } from "@gluestack-ui/provider";
import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";

const GluestackUIStyledProvider = createProvider({ StyledProvider });

const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fonts: {
      heading: "p7b", // Heading component uses this by default
      body: "p4r", // Text component uses this by default
      mono: "monospace",
    },
  },
});

const GluestackUIProvider = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIStyledProvider config={config} colorMode={colorScheme}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
};

export default GluestackUIProvider;
