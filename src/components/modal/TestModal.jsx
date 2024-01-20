import {
  Center,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";

export default function TestModal({ isCommentBoxOpen, SetisCommentBoxOpen }) {
  return (
    <Modal
      isOpen={isCommentBoxOpen}
      onClose={() => {
        //   setShowModal(false);
        SetisCommentBoxOpen(false);
      }}
      // finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent position="absolute" bottom={0} left={0} w={"$full"} rounded={"$none"}>
        <ModalHeader />
        <ModalBody>
          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="Enter a comment..." />
          </Input>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
