import { Ionicons } from "@expo/vector-icons";
import { config } from "@gluestack-ui/config";
import { Spinner } from "@gluestack-ui/themed";

export default function NotificationIcon({ severity }) {
  switch (severity) {
    case "success":
      return <Ionicons name="checkmark-circle-outline" color={config.tokens.colors.green400} size={24} />;

    case "error":
      return <Ionicons name="stop-circle-outline" color={config.tokens.colors.red400} size={24} />;

    case "in_progress":
      return <Spinner color={"$blue300"} size="small" />;

    default:
      return <Ionicons name="information-circle-outline" color={config.tokens.colors.blue400} size={24} />;
  }
}
