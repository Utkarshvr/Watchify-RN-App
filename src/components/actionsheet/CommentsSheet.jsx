import { FlatList, Heading } from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";

import PropTypes from "prop-types";
import CommentCard from "../card/CommentCard";
import CommentModal from "../modal/CommentModal";
import { useAuthData } from "../../context/AuthContext";
import { useCommentsAPI, useCommentsData } from "../../context/CommentsContext";

const windowHeight = Dimensions.get("window").height;

export default function CommentsSheet({ setIsSheetOpen, isSheetOpen }) {
  const { comments, videoUUID } = useCommentsData();
  const { loadComments } = useCommentsAPI();

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const { isAuth, user } = useAuthData();

  if (comments?.length === 0) return;

  return (
    <Actionsheet
      isKeyboardDismissable={true}
      snapPoints={[25, 50, 75]}
      // snapPoints={["25%", "50%", "75%"]}
      flex={1}
      isOpen={isSheetOpen}
      onClose={handleClose}
      zIndex={999}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent w={"$full"} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box p={"$2"} gap={"$2"} flex={1} w={"$full"}>
          <Heading>Comments</Heading>
          <FlatList
            data={comments}
            flex={1}
            w="$full"
            keyExtractor={(comment) => comment?._id}
            renderItem={({ item }) => <CommentCard comment={item} />}
          />

          <CommentModal videoUUID={videoUUID} loadComments={loadComments} isAuth={isAuth} user={user} />
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

CommentsSheet.propTypes = {
  isSheetOpen: PropTypes.bool.isRequired,
  setIsSheetOpen: PropTypes.func.isRequired,
};
