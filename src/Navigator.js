import { Tabs } from "expo-router";
import useBGColor from "./hooks/useBGColor";
import { Ionicons } from "@expo/vector-icons";
import UserAvatar from "./components/ui/avatar/UserAvatar";

const tabs = [
  { name: "index", icon: { fill: "home", outline: "home-outline" } },
  { name: "studio", icon: { fill: "analytics", outline: "analytics-outline" } },
  { name: "subscriptions", icon: { fill: "library", outline: "library-outline" } },
  { name: "you", CustomIcon: UserAvatar },
];

export default function Navigator() {
  const { bgColor, textColor } = useBGColor();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: bgColor,
        },

        headerTitleStyle: { color: textColor },
        headerShown: false,

        tabBarActiveTintColor: textColor,
        tabBarLabelStyle: { display: "none" },
      }}
    >
      {tabs.map(({ name, icon, CustomIcon }) => (
        <Tabs.Screen
          // Name of the dynamic route.
          name={name}
          key={name}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              CustomIcon ? (
                <CustomIcon focused={focused} size={size} color={color} />
              ) : (
                <Ionicons name={focused ? icon?.fill : icon?.outline} size={size} color={color} />
              ),
          }}
        />
      ))}
    </Tabs>
  );
}
