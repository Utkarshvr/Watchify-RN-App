import { Tabs } from "expo-router";
import useBGColor from "./hooks/useBGColor";
import { Ionicons } from "@expo/vector-icons";

export default function Navigator() {
  const { bgColor, textColor } = useBGColor();

  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          marginBottom: 10,
          marginTop: 10,
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: bgColor,
        },
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTitleStyle: { color: textColor },
        headerShown: false,

        tabBarActiveTintColor: textColor,
      }}
    >
      <Tabs.Screen
        // Name of the dynamic route.
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
