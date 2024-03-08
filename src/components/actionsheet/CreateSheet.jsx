import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  AddIcon,
  Box,
  Button,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import useBGColor from "../../hooks/useBGColor";
import useUploadVideo from "../../hooks/useUploadVideo";

export default function CreateSheet() {
  const { textColor } = useBGColor();

  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  const { showModal: showCreatePlaylistModal } = useCreatePlaylistModal();

  const { uploadVideo } = useUploadVideo();

  return (
    <Box>
      <Button
        rounded={"$full"}
        paddingHorizontal={"$3"}
        paddingVertical={"$3"}
        variant="outline"
        action="secondary"
        onPress={handleClose}
        onLongPress={handleClose}
        size="lg"
      >
        <ButtonIcon as={AddIcon} />
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem
            onPress={() => {
              handleClose();
              showCreatePlaylistModal();
            }}
          >
            <Entypo name="add-to-list" size={14} color={textColor} />
            <ActionsheetItemText>Create a new playlist</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              handleClose();
              uploadVideo({ pushToScreen: true });
            }}
          >
            <Ionicons name="cloud-upload-outline" size={14} color={textColor} />
            <ActionsheetItemText>Upload a video</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
