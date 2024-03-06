import { useState } from "react";
import IconBtn from "../Button/IconBtn";
import SaveToPlaylistSheet from "../actionsheet/SaveToPlaylistSheet";

export default function SaveVideoBtn() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <IconBtn name={"save-outline"} BtnText={"Save"} onPress={() => setIsSheetOpen(true)} />
      <SaveToPlaylistSheet isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
    </>
  );
}
