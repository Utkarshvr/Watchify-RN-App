import { useState } from "react";
import IconBtn from "../Button/IconBtn";
import ShareLinkSheet from "../actionsheet/ShareLinkSheet";
import { useVideoData } from "../../context/VideoContext";

// eslint-disable-next-line no-undef
const watchifyWebsiteURL = process.env.EXPO_PUBLIC_WEBSITE_BASE_URL || "https://watchify-client.vercel.app";

export default function ShareBtn() {
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const { videoID } = useVideoData();

  return (
    <>
      <IconBtn name={"share-outline"} BtnText={"Share"} onPress={() => setIsShareSheetOpen(true)} />
      <ShareLinkSheet
        isShareSheetOpen={isShareSheetOpen}
        setIsShareSheetOpen={setIsShareSheetOpen}
        link={`${watchifyWebsiteURL}/videos/${videoID}`}
      />
    </>
  );
}
