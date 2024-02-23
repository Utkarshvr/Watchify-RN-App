import Logo from "../brand/Logo";
import { BellIcon, Box, Button, ButtonIcon, SearchIcon } from "@gluestack-ui/themed";
import LoginBtn from "../Button/LoginBtn";
import LogoutBtn from "../Button/LogoutBtn";
import useBGColor from "../../hooks/useBGColor";
import IconBtn from "../Button/IconBtn";
import { router } from "expo-router";

export default function Header({ navigation, layout, options, route }) {
  const { bgColor } = useBGColor();

  const canGoBack = navigation.canGoBack();

  return (
    <Box
      gap={4}
      flexDirection="row"
      paddingVertical="$2"
      paddingHorizontal={"$2"}
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={bgColor}
    >
      {canGoBack ? (
        <IconBtn
          noPadding
          iconSize={24}
          variant="link"
          size="md"
          onPress={() => navigation.goBack()}
          name={"chevron-back"}
        />
      ) : (
        <Logo />
      )}

      <Box flexDirection="row" gap="$4" alignItems="center">
        <Button rounded="$full" size="xl" variant="link" action="secondary">
          <ButtonIcon as={BellIcon} />
        </Button>
        <Button
          onPress={() => router.push("/(tabs)/search")}
          rounded="$full"
          size="xl"
          variant="link"
          action="secondary"
        >
          <ButtonIcon as={SearchIcon} />
        </Button>
        <LoginBtn showText={false} />
        <LogoutBtn showText={false} />
      </Box>
    </Box>
  );
}
