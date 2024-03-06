import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";
import { useState } from "react";
import { config } from "@gluestack-ui/config";

export default function IconBtn({
  name,
  size = "xs",
  iconSize = 16,
  rounded = true,
  BtnText = null,
  variant = "outline",
  action = "secondary",
  iconType = "Ionicons",
  onPress = () => {},
  noPadding = false,
  isLoading = false,
  isDisabled = false,
  initialColor = config.tokens.colors.secondary400,
}) {
  const { textColor } = useBGColor();

  const [btnColor, setBtnColor] = useState(initialColor);

  const paddingHorizontal = noPadding ? 0 : rounded ? (size === "xs" ? "$2" : "$3") : "$2";

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
      isDisabled={isDisabled}
    >
      {isLoading ? <ButtonSpinner mr="$1" /> : <Icon name={name} size={iconSize} color={btnColor} />}
      {BtnText && (
        <ButtonText color={btnColor} size={size} mt={size === "xs" ? "$0.5" : null}>
          {BtnText}
        </ButtonText>
      )}
    </Button>
  );
}
