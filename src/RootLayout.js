import App from "./App";
// import TabNavigator from "./TabNavigator";
import StackNavigator from "./StackNavigator";
import AuthProvider from "./Providers/AuthProvider";
import AxiosInterceptor from "./Providers/AxiosInterceptor";
import GluestackUIProvider from "./Providers/GluestackUIProvider";
import CreatePlaylistModalProvider from "./Providers/CreatePlaylistModalProvider";
import RealTimeNotifications from "./RealTimeNotifications";
import UploadVideoProvider from "./Providers/UploadVideoProvider";
import NotificationProvider from "./Providers/NotificationProvider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <NotificationProvider>
            <CreatePlaylistModalProvider>
              <UploadVideoProvider>
                <RealTimeNotifications>
                  <App>
                    <StackNavigator />
                  </App>
                </RealTimeNotifications>
              </UploadVideoProvider>
            </CreatePlaylistModalProvider>
          </NotificationProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
