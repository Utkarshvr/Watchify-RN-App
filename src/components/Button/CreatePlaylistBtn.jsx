import CreatePlaylistModal from "../modal/CreatePlaylistModal";
import { AddIcon, Button, ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import CreatePlaylistModalProvider from "../../Providers/CreatePlaylistModalProvider";
import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";

export default function CreatePlaylistBtn({ ...props }) {
  return (
    <CreatePlaylistModalProvider>
      <Children {...props} />
    </CreatePlaylistModalProvider>
  );
}

function Children({ ...props }) {
  const { showModal } = useCreatePlaylistModal();
  const { size = "xs", variant = "link", action = "primary", IconColor = "$secondary300" } = props;
  return (
    <>
      <Button onPress={showModal} size={size} variant={variant} action={action} {...props}>
        <ButtonIcon as={AddIcon} size="sm" color={IconColor} />
        <ButtonText>New playlist</ButtonText>
      </Button>
      <CreatePlaylistModal />
    </>
  );
}
