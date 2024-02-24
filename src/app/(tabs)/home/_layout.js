import { Stack } from "expo-router";
import Header from "../../../components/core/Header";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, layout, options, route }) => (
          <Header navigation={navigation} layout={layout} options={options} route={route} />
        ),
      }}
    >
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
}
