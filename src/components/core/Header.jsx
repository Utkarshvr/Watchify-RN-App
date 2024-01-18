import Logo from "../brand/Logo";
import { BellIcon, Box, Button, ButtonIcon, SearchIcon } from "@gluestack-ui/themed";
import LoginBtn from "../Button/LoginBtn";
import LogoutBtn from "../Button/LogoutBtn";
import useBGColor from "../../hooks/useBGColor";

export default function Header() {
  const { bgColor } = useBGColor();
  return (
    <Box
      gap={4}
      flexDirection="row"
      paddingVertical="$2"
      paddingHorizontal={"$4"}
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={bgColor}
    >
      <Logo />

      <Box flexDirection="row" gap="$4" alignItems="center">
        <Button rounded="$full" size="xl" variant="link" action="secondary">
          <ButtonIcon as={BellIcon} />
        </Button>
        <Button rounded="$full" size="xl" variant="link" action="secondary">
          <ButtonIcon as={SearchIcon} />
        </Button>
        <LoginBtn showText={false} />
        <LogoutBtn showText={false} />
      </Box>
    </Box>
  );
}
