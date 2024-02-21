import { Tabs } from "expo-router";
import useBGColor from "./hooks/useBGColor";
import { Ionicons } from "@expo/vector-icons";
import UserAvatar from "./components/ui/avatar/UserAvatar";
import CreateSheet from "./components/actionsheet/CreateSheet";
import Header from "./components/core/Header";

const tabs = [
  { name: "index", icon: { fill: "home", outline: "home-outline" } },
  { name: "studio", icon: { fill: "analytics", outline: "analytics-outline" } },
  { name: "create", CustomIcon: CreateSheet, isButton: true },
  { name: "subscriptions", icon: { fill: "library", outline: "library-outline" } },
  { name: "you", CustomIcon: UserAvatar },
];

const hiddenTabs = ["rough"];

export default function TabNavigator() {
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
        headerShown: true,

        tabBarActiveTintColor: textColor,
        tabBarLabelStyle: { display: "none" },
        header: ({ navigation, layout, options, route }) => (
          <Header navigation={navigation} layout={layout} options={options} route={route} />
        ),
      }}
    >
      {tabs.map(({ name, icon, CustomIcon, isButton }) => (
        <Tabs.Screen
          // Name of the dynamic route.
          name={name}
          key={name}
          options={{
            ...(isButton
              ? {
                  tabBarButton: () => <CustomIcon />,
                }
              : {
                  tabBarIcon: ({ color, size, focused }) =>
                    CustomIcon ? (
                      <CustomIcon focused={focused} size={size} color={color} />
                    ) : (
                      <Ionicons name={focused ? icon?.fill : icon?.outline} size={size} color={color} />
                    ),
                }),
          }}
        />
      ))}
      {hiddenTabs.length > 0
        ? hiddenTabs.map((name) => <Tabs.Screen key={name} name={name} options={{ href: null }} />)
        : null}
    </Tabs>
  );
}
