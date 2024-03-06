import App from "./App";
import TabNavigator from "./TabNavigator";
import StackNavigator from "./StackNavigator";
import AuthProvider from "./Providers/AuthProvider";
import AxiosInterceptor from "./Providers/AxiosInterceptor";
import GluestackUIProvider from "./Providers/GluestackUIProvider";
import CreatePlaylistModalProvider from "./Providers/CreatePlaylistModalProvider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <CreatePlaylistModalProvider>
            <App>
              <StackNavigator />
            </App>
          </CreatePlaylistModalProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
