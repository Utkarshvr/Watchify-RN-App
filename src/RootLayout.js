import App from "./App";
import Navigator from "./Navigator";
import AuthProvider from "./Providers/AuthProvider";
import AxiosInterceptor from "./Providers/AxiosInterceptor";
import GluestackUIProvider from "./Providers/GluestackUIProvider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <App>
            <Navigator />
          </App>
        </AxiosInterceptor>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
