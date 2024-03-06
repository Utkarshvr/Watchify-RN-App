import {
  Button,
  CloseIcon,
  Heading,
  Icon,
  ModalCloseButton,
  ModalFooter,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  ToastTitle,
  ToastDescription,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import {
  Box,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useCreatePlaylistModal } from "../../context/CreatePlaylistModalContext";
import { Text } from "@gluestack-ui/themed";
import { Select } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import { useToast } from "@gluestack-ui/themed";
import { Toast } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import axiosInstance from "../../utils/axiosInstance";

export default function CreatePlaylistModal() {
  const [playlistName, setPlaylistName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setIsPrivate(true);
    setPlaylistName("");
  };

  const toast = useToast();

  const { open: isOpen, closeModal: onClose, showModal } = useCreatePlaylistModal();

  const handleCreatePlaylist = async () => {
    showModal();
    if (!playlistName || playlistName?.trim() === "")
      return toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <Toast nativeID={toastId} action="error" variant="accent">
              <VStack space="xs">
                <ToastTitle>Playlist title is missing</ToastTitle>
                {/* <ToastDescription>Fill in the playlist title</ToastDescription> */}
              </VStack>
            </Toast>
          );
        },
      });

    setIsCreating(true);
    try {
      const { data } = await axiosInstance.post("/playlist", { title: playlistName, desc: "", isPrivate: isPrivate });

      console.log("::createplaylist::", data);

      resetForm();
      onClose();
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Playlist created</ToastTitle>
                {/* <ToastDescription>Fill in the playlist title</ToastDescription> */}
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.log(error);
      error("Couldn't create playlist");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>New Playlist</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Input isDisabled={isCreating} variant="underlined" size="lg">
              <InputField
                autoFocus
                placeholder="Title"
                onChangeText={(text) => setPlaylistName(text)}
                value={playlistName}
              />
            </Input>
            <Box mt="$4">
              <Text size="xs" color="$secondary400">
                Privacy
              </Text>
              <Select
                isDisabled={isCreating}
                onValueChange={(val) => setIsPrivate(val === "private")}
                defaultValue="private"
              >
                <SelectTrigger variant="underlined" size="sm">
                  <SelectInput placeholder="Select option" />
                  <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Private" value="private" />
                    <SelectItem label="Public" value="public" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="link" size="sm" action="secondary" mr="$3" onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="xs"
              rounded="$3xl"
              isDisabled={isCreating}
              action="primary"
              variant="outline"
              onPress={handleCreatePlaylist}
            >
              {isCreating && <ButtonSpinner />}
              <ButtonText>Create</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
