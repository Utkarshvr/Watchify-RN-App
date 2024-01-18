import { Box } from "@gluestack-ui/themed";
import IconBtn from "../Button/IconBtn";

export default function VideoCardActions() {
  return (
    <Box gap={"$2"} flexDirection="row" justifyContent="flex-end">
      {/* Like */}
      <IconBtn name={"thumbs-up-outline"} BtnText={null} />
      {/* Share */}
      <IconBtn name={"share-outline"} BtnText={"Share"} />
      {/* Save */}
      <IconBtn name={"save-outline"} BtnText={"Save"} />
    </Box>
  );
}
