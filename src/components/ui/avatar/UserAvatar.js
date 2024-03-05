import { AvatarImage } from "@gluestack-ui/themed";
import { useAuthData } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import PropTypes from "prop-types";
import useBGColor from "../../../hooks/useBGColor";
import { Image } from "react-native";

export default function UserAvatar({ focused, size, color }) {
  const { user, isAuth } = useAuthData();

  const { textColor } = useBGColor();

  return isAuth ? (
    <>
      <Image
        width={size}
        height={size}
        source={{ uri: user?.picture }}
        style={{
          borderColor: focused ? textColor : null,
          borderWidth: 1,
          borderRadius: 9999,
        }}
        alt="You"
      />
    </>
  ) : (
    <>
      <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
    </>
  );
}

UserAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  focused: PropTypes.bool,
};
