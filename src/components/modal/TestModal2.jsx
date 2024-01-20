import {
  Button,
  ButtonText,
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
import { useRef, useState } from "react";

export default function TestModal2() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  const ref = useRef(null);

  return (
    <Center>
      <Button onPress={() => setShowModal(true)} ref={ref}>
        <ButtonText>Show Modal</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          //   setShowModal(false);
          setShowModal(false);
        }}
        finalFocusRef={ref}
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
    </Center>
  );
}
