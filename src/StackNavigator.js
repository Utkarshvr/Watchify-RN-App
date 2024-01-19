import { Stack } from "expo-router";
import Header from "./components/core/Header";

export default function StackNavigator() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, layout, options, route }) => (
          <Header navigation={navigation} layout={layout} options={options} route={route} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
