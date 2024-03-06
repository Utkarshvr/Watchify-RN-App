import { Box } from "@gluestack-ui/themed";
import IconBtn from "../Button/IconBtn";
import LikeVideoBtn from "./LikeVideoBtn";
import ShareBtn from "./ShareBtn";

export default function VideoCardActions() {
  return (
    <Box gap={"$2"} flexDirection="row" justifyContent="flex-end">
      {/* Like */}
      <LikeVideoBtn />
      {/* Share */}
      <ShareBtn />
      {/* Save */}
      <IconBtn name={"save-outline"} BtnText={"Save"} />
    </Box>
  );
}
