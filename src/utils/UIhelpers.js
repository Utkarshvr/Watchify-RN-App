import { AntDesign } from "@expo/vector-icons";
import { Link, LinkText, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import useBGColor from "../hooks/useBGColor";

export const renderDescription = (desc) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  const parts = desc.split(linkRegex);

  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return <Text key={index}>{part}</Text>;
    } else {
      const url = part.trim();
      return (
        <TouchableOpacity key={index}>
          <Link isExternal href={url}>
            <LinkText>{url}</LinkText>
          </Link>
        </TouchableOpacity>
      );
    }
  });
};

export function SocialIcon({ url, size = 20 }) {
  // Extract the desired part (e.g., "instagram")
  const websiteName = url.match(/^https?:\/\/(?:www\.)?([^.]+)\./)?.[1] || "";

  const { textColor } = useBGColor();

  switch (websiteName) {
    case "instagram":
      return <AntDesign color={textColor} name="instagram" size={size} />;
    case "youtube":
      return <AntDesign color={textColor} name="youtube" size={size} />;
    case "twitter":
      return <AntDesign color={textColor} name="twitter" size={size} />;
    case "facebook":
      return <AntDesign color={textColor} name="facebook-square" size={size} />;
    case "linkedin":
      return <AntDesign color={textColor} name="linkedin-square" size={size} />;
    case "github":
      return <AntDesign color={textColor} name="github" size={size} />;
    default:
      return <AntDesign color={textColor} name="link" size={size} />;
  }
}
