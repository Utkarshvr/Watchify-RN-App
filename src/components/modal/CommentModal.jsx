import { useState } from "react";
import { Box, InputField, Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";
import { Image, TouchableOpacity } from "react-native";
import IconBtn from "../Button/IconBtn";
import axiosInstance from "../../utils/axiosInstance";

export default function CommentModal({ videoUUID, loadComments, parentCommentID = null, user, isAuth }) {
  const [isUserCommenting, setIsUserCommenting] = useState(false);

  const [comment, setComment] = useState(null);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const postComment = async () => {
    if (!comment) return;

    setIsPostingComment(true);
    try {
      const url = parentCommentID
        ? `/video/${videoUUID}/comment?parentCommentID=${parentCommentID}`
        : `/video/${videoUUID}/comment`;

      const { data } = await axiosInstance.post(url, {
        content: comment,
      });
      console.log(data);
      // refreshComments();
      // if (isReply) hideCommentForm();
      setIsPostingComment(false);
      setIsUserCommenting(false);
      loadComments(videoUUID);

      setComment("");
    } catch (error) {
      console.log(JSON.stringify(error));
      // errorAPI("Couldn't add reply");
    }
  };
  return (
    <>
      <TouchableOpacity onPress={() => setIsUserCommenting(true)}>
        <Input mb="$2" variant="outline" size="sm" isDisabled={false} isInvalid={false} isReadOnly={true}>
          <InputField placeholder="Add a comment..." value={comment} />
        </Input>
      </TouchableOpacity>

      <Modal isOpen={isUserCommenting} onClose={() => setIsUserCommenting(false)}>
        <ModalBackdrop />
        <ModalContent position="absolute" bottom={0} left={0} w={"$full"} rounded={"$none"}>
          <ModalHeader />
          <ModalBody flex={1}>
            <Box justifyContent="space-between" gap={"$2"} flex={1} flexDirection="row" alignItems="center">
              <Image
                source={{
                  uri:
                    user?.picture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPJ9v5toYgVGvYgOZNQu6DtFKTclFGmb9fV-BoJWs3-q3Oj9knQ9dX08PhbnXJ1PwbjY&usqp=CAU",
                }}
                height={28}
                width={28}
                borderRadius={999}
              />
              <Input flex={1} height={80} variant="outline" size="sm">
                <InputField
                  autoFocus
                  multiline
                  numberOfLines={4}
                  placeholder="Add a comment..."
                  onChangeText={(text) => setComment(text)}
                  value={comment}
                />
              </Input>

              <IconBtn isDisabled={!isAuth} name={"send-outline"} onPress={postComment} isLoading={isPostingComment} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
