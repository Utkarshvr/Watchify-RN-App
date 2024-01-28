import { Box } from "@gluestack-ui/themed";
import IconBtn from "../Button/IconBtn";
import LikeVideoBtn from "./LikeVideoBtn";

export default function VideoCardActions() {
  return (
    <Box gap={"$2"} flexDirection="row" justifyContent="flex-end">
      {/* Like */}
      <LikeVideoBtn />
      {/* Share */}
      <IconBtn name={"share-outline"} BtnText={"Share"} />
      {/* Save */}
      <IconBtn name={"save-outline"} BtnText={"Save"} />
    </Box>
  );
}
