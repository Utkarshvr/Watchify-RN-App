import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import PropTypes from "prop-types";

import useBGColor from "../../hooks/useBGColor";
import { useAuthAPI, useAuthData } from "../../context/AuthContext";
export default function LogoutBtn({ showText = true }) {
  const { textColor } = useBGColor();

  const { isAuth } = useAuthData();
  const { reset } = useAuthAPI();

  if (!isAuth) return;

  return (
    <Button
      gap={"$2"}
      rounded={"$full"}
      paddingHorizontal={"$2"}
      paddingVertical={"$2"}
      action="secondary"
      variant="outline"
      onPress={reset}
    >
      <Ionicons name="log-out" size={20} color={textColor} />
      {showText && <ButtonText>Logout</ButtonText>}
    </Button>
  );
}

LogoutBtn.propTypes = {
  onLogout: PropTypes.func,
  showText: PropTypes.bool,
};
