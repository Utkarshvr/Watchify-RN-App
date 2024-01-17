import { AvatarImage } from "@gluestack-ui/themed";
import { useAuthData } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import PropTypes from "prop-types";
import useBGColor from "../../../hooks/useBGColor";

export default function UserAvatar({ focused, size, color }) {
  const { user, isAuth } = useAuthData();

  const { textColor } = useBGColor();

  return isAuth ? (
    <>
      <AvatarImage
        width={size}
        height={size}
        source={{ uri: user?.picture }}
        borderColor={focused ? textColor : null}
        borderWidth={"$2"}
        rounded={"$full"}
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
