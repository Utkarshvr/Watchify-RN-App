import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";
import useBGColor from "../../hooks/useBGColor";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function ChannelNavigator() {
  const { bgColor, textColor } = useBGColor();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarIndicatorStyle: { height: 3, backgroundColor: textColor },
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarStyle: { backgroundColor: bgColor },
      }}
    >
      <MaterialTopTabs.Screen name="videos" options={{ title: "Videos" }} />
      <MaterialTopTabs.Screen name="playlists" options={{ title: "Playlists" }} />
    </MaterialTopTabs>
  );
}
