import { Box } from "@gluestack-ui/themed";
import LikeVideoBtn from "./LikeVideoBtn";
import ShareBtn from "./ShareBtn";
import SaveVideoBtn from "./SaveVideoBtn";

export default function VideoCardActions() {
  return (
    <Box gap={"$2"} flexDirection="row" justifyContent="flex-end">
      {/* Like */}
      <LikeVideoBtn />
      {/* Share */}
      <ShareBtn />
      {/* Save */}
      <SaveVideoBtn />
    </Box>
  );
}
