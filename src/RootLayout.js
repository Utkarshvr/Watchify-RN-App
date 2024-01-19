import App from "./App";
import TabNavigator from "./TabNavigator";
import StackNavigator from "./StackNavigator";
import AuthProvider from "./Providers/AuthProvider";
import AxiosInterceptor from "./Providers/AxiosInterceptor";
import GluestackUIProvider from "./Providers/GluestackUIProvider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <App>
            <StackNavigator />
          </App>
        </AxiosInterceptor>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
