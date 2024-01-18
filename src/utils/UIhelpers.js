import { Link, LinkText, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

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
