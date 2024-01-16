import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import PropTypes from "prop-types";

import useBGColor from "../../hooks/useBGColor";
import { openLoginUrl } from "../../utils/api/apiCalls";
import { useAuthData } from "../../context/AuthContext";

export default function LoginBtn({ onLogin = openLoginUrl, showText = true }) {
  const { textColor } = useBGColor();

  const { isAuth } = useAuthData();

  if (isAuth) return;

  return (
    <Button
      gap={"$2"}
      rounded={"$full"}
      paddingHorizontal={"$2"}
      paddingVertical={"$2"}
      action="secondary"
      variant="outline"
      onPress={onLogin}
    >
      <Ionicons name="logo-google" size={20} color={textColor} />
      {showText && <ButtonText>Login</ButtonText>}
    </Button>
  );
}

LoginBtn.propTypes = {
  onLogin: PropTypes.func,
};
