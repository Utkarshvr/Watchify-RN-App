import CreatePlaylistModal from "../modal/CreatePlaylistModal";
import { AddIcon, Button, ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import CreatePlaylistModalProvider from "../../Providers/CreatePlaylistModalProvider";
import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";

export default function CreatePlaylistBtn({ setIsSaveToPlaylistSheetOpen }) {
  return (
    <CreatePlaylistModalProvider>
      <Children />
    </CreatePlaylistModalProvider>
  );
}

function Children() {
  const { showModal, open } = useCreatePlaylistModal();
  console.log({ open });
  return (
    <>
      <Button onPress={showModal} size="xs" variant="link">
        <ButtonIcon as={AddIcon} size="sm" />
        <ButtonText>New playlist</ButtonText>
      </Button>
      <CreatePlaylistModal />
    </>
  );
}
