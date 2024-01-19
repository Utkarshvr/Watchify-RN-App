import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import { useState } from "react";
import { config } from "@gluestack-ui/config";

export default function IconBtn({
  name,
  size = "xs",
  rounded = true,
  BtnText = null,
  variant = "outline",
  action = "secondary",
  iconType = "Ionicons",
  onPress = () => {},
}) {
  const { textColor } = useBGColor();

  const initialColor = config.tokens.colors.secondary400;
  const [btnColor, setBtnColor] = useState(initialColor);

  const paddingHorizontal = rounded ? (size === "xs" ? "$2" : "$3") : "$2";

  let Icon = Ionicons;

  switch (iconType) {
    case "Ionicons":
      Icon = Ionicons;
      break;

    case "EvilIcons":
      Icon = EvilIcons;
      break;

    case "Entypo":
      Icon = Entypo;
      break;

    default:
      Icon = Ionicons;
      break;
  }

  return (
    <Button
      action={action}
      variant={variant}
      onPress={onPress}
      onPressIn={() => setBtnColor(textColor)}
      onPressOut={() => setBtnColor(initialColor)}
      rounded={rounded ? "$full" : `$${size}`}
      paddingHorizontal={paddingHorizontal}
      size={size}
      gap={"$1"}
    >
      <Icon name={name} size={16} color={btnColor} />
      {BtnText && (
        <ButtonText color={btnColor} size={size} mt={size === "xs" ? "$0.5" : null}>
          {BtnText}
        </ButtonText>
      )}
    </Button>
  );
}
